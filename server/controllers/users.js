const UserModel = require('../models/userSchema');

exports.signin= (req,res)=>{
    console.log(`This is login`);
    res.send('THis is sign in API');
}

//promiss
/*exports.signup11= (req,res)=>{
    //console.log('body:',req);
   
    const { fname,lname,email,phone,work,password,cpassword } = req.body;

    if(!fname || !lname || !email || !phone || !work || !password || !cpassword){
        res.status(400).json({
            status:0,
            message:"parameter name is required",
            data:null
        })
    }

    if(password !== cpassword){
        res.status(400).json({
            status:0,
            message:"Confirm password not matched",
            data:null
        })
    }

    UserModel.findOne({email:email})
        .then((userExist) => {
            if(userExist){
                console.log(userExist);
                res.status(400).json({
                    status:0,
                    message:"Email already exist.",
                    data:null
                })
            }

            
            
            
        })

       
        const user = new UserModel({
            fname:fname,
            lname:lname,
            email:email,
            phone:phone,
            work:work,
            password:password,
            cpassword:cpassword
        })
    
        user.save().then((newUser)=>{
            console.log(newUser);
            res.status(200).json({
                status:1,
                message:"Registration has been completed",
                data:newUser
            })
        }).catch((error)=>{
            res.status(400).json({
                status:0,
                message:"Something went wrong",
                data:error
            })
        })
    
}*/


exports.signup = async (req,res)=>{
    
    const { fname,lname,email,phone,work,password,cpassword } = req.body;

    if(!fname || !lname || !email || !phone || !work || !password || !cpassword){
        res.status(400).json({
            status:0,
            message:"parameter name is required",
            data:null
        })
        return;
    }

    if(password !== cpassword){
        res.status(400).json({
            status:0,
            message:"Confirm password not matched",
            data:null
        })
        return;
    }

    try {
        const userExist = await UserModel.findOne({email:email});
        if(userExist){
            //console.log(userExist);
            res.status(400).json({
                status:0,
                message:"Email already exist.",
                data:userExist
            })
            return;
        }

        const userPhone = await UserModel.findOne({phone:phone});
        if(userPhone){
            //console.log(userExist);
            res.status(400).json({
                status:0,
                message:"Phone already exist.",
                data:userPhone
            })
            return;
        }

        const user = new UserModel({
            fname:fname,
            lname:lname,
            email:email,
            phone:phone,
            work:work,
            password:password,
            cpassword:cpassword
        })
    
        const responce = await user.save();
        if(responce){
            res.status(200).json({
                status:1,
                message:"Registration has been completed",
                data:responce
            })
            return;
        } else {
            res.status(400).json({
                status:0,
                message:"Something went wrong"
            }); 
            return;
        }
        
        
        
    } catch (error){
        res.status(400).json({
            status:0,
            message:"Something went wrong",
            data:error
        });
        return;
    }

    
    
}