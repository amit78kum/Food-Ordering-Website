import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"
import nodemailer from "nodemailer"
const createToken =(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        // user:process.env.EMAIL,
        // pass:process.env.PASSWORD
        user:"ak5518125@gmail.com",
        pass:"Amit@#7488"

    }
}) 

//login user
const loginUser=async(req,res)=>{
    const {email,password}=req.body;
    
    try{
        const user=await userModel.findOne({email});
        if(!user){
            return res.json({success:false,message:"User Doesnot Exist"})
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.json({success:false,message:"Invalid Credentials"})
        }
        const token=createToken(user._id);
        res.json({success:true,token});

    }catch(error){
        console.log(error);
        escape.json({success:false,message:"Error"});

    }

}


//register user
const registerUser=async(req,res)=>{
    const {name,password,email}=req.body;
    try{
        // checking User is allready exists
        const exists= await userModel.findOne({email});
        if(exists){
            return res.json({success:false,message:"User Already Exists"})
        }
        // validating email format and strong password
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Please enter a  valid Email"});
        }

        if(password.length<8){
            return res.json({success:false,message:"Please enter a strong password"})
        }
        //hashing user password
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);

        const newUser=new userModel({
            name:name,
            email:email,
            password:hashedPassword
        })
        const user = await newUser.save();
        const token=createToken(user._id)
        res.json({success:true,token});
        



    } catch(error){
        console.log(error);
        res.json({success:false,message:"Error"});

    }

}
const passwordreset=async(req,res)=>{
    console.log(req.body)

    const {email} = req.body;

    if(!email){
        res.status(401).json({status:401,message:"Enter Your Email"})
    }

    try {
        const userfind = await userModel.findOne({email}); 

        // token generate for reset password
        const token = jwt.sign({_id:userfind._id},process.env.JWT_SECRET,{
            expiresIn:"120s"
        });
        
        const setusertoken = await userModel.findByIdAndUpdate({_id:userfind._id},{verifytoken:token},{new:true});


        if(setusertoken){
            const mailOptions = {
                from:"ak5518125@gmail.com",
                to:email,
                subject:"Sending Email For password Reset",
                text:`This Link Valid For 2 MINUTES http://localhost:5173/forgotpassword/${userfind.id}/${setusertoken.verifytoken}`
            }

            transporter.sendMail(mailOptions,(error,info)=>{
                if(error){
                    console.log("error",error);
                    res.status(401).json({status:401,message:"email not send"})
                }else{
                    console.log("Email sent",info.response);
                    res.status(201).json({status:201,message:"Email sent Succsfully"})
                }
            })

        }

    } catch (error) {
        res.status(401).json({status:401,message:"invalid user"})
    }

};


export{loginUser,registerUser,passwordreset};