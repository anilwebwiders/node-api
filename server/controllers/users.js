const UserModel = require('../models/userSchema');

exports.signin= (req,res)=>{
    console.log(`This is login`);
    res.send('THis is sign in API');
}

exports.signup= (req,res)=>{
    //console.log('body:',req);
    /*if(!req.body){
        res.json({
            status:0,
            message:"Check parameter"
        })
        return
    }*/
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

        /*UserModel.findOne({phone:phone})
        .then((userExist) => {
            if(userExist){
                console.log(userExist);
                res.status(400).json({
                    status:0,
                    message:"phone   already exist.",
                    data:userExist
                })
            }
        }).catch((error)=>{
            res.status(400).json({
                status:0,
                message:"Some error occured during registration",
                data:error
            })
        })*/
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
    
}