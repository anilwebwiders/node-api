const UserModel = require('../models/userSchema');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


exports.signin= async (req,res)=>{

    const { email, password} = req.body;
    if(!email || !password){
        res.status(400).json({
            status:0,
            message:"Check parameters"
        })
        return;
    }

    try {
        const data = await UserModel.findOne({email:email});
        if(data){


            let isMatch = await bcrypt.compare(password,data.password)
        
            if(!isMatch){

                
                res.status(400).json({
                    status:0,
                    message:'Invalid credentials',
                })
                return;
            } else {
                let token = await data.generateAuthToken();
              

                res.cookie('authtoken',token,{
                    expires:new Date(Date.now()+1000*60*60*24),
                    httpOnly:true
                })

                res.status(200).json({
                    status:1,
                    message:'Logged in successfully',
                    data:data
                })
                return;
            }

             
        } else {
            res.status(400).json({
                status:0,
                message:'Invalid credentials'
            })
            return;  
        }
    } catch (error){
        res.status(400).json({
            status:0,
            message:'something went wrong',
            error:error
        })
        return; 
    }
}

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