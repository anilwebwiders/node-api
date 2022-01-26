const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    fname:{
        type:String,
        required:true
    },
    lname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:Number,
        required:true,
        unique:true
    },
    work:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    cpassword:{
        type:String,
        required:true
    },
    token:{
        type:String,
        required:true
    }
})

userSchema.pre('save', async function(next){
    if(this.isModified('password')){
        console.log('password encoded!')
        this.password = await bcrypt.hash(this.password,12)
        this.cpassword = await bcrypt.hash(this.cpassword,12)
    }
    next()
});

userSchema.methods.generateAuthToken = async function(){
    try{
        let token = jwt.sign({_id:this._id}, process.env.SECRET_KEY);
        this.token = token;
        await this.save();
        return token;
    } catch(error){
        console.log('error in genrate auth token',error);
    }
}

const User = mongoose.model('users',userSchema);

module.exports = User;