//  Adding bcrypt for the hashing of the password
const bcrypt = require("bcrypt");

// import the model for the controller to interact with the database
const userModel = require("../model/userModel");

// Get the env data for the secret key
require("dotenv").config();

// We want Jwt token also so 
const jwt = require("jsonwebtoken");


exports.register = async(req,res)=>{
    try {
        // first step is to fetch all the details
        const{name,email,password} = req.body;

    

        // Check if the user already exists i.e. trying to signup again
        const existinguser  = await userModel.findOne({email});
        if(existinguser)
        {
            return res.status(400).json(
                {
                    success:false,
                    message:"Sorry User already exists, Login"
                }
            );
        }
        let hashedPassword;
        try{
            hashedPassword = await bcrypt.hash(password, 10);
        }
        catch(err) {
            return res.status(500).json({
                success:false,
                message:'Error in hashing Password now also',
            });
        }
        // Now as the password is hashed , now we need to create a user in the dataase
        const  user = await userModel.create({name,email,password:hashedPassword}) // u have to give like password:hashedPassword
        return res.status(200).json({
            success:true,
            message:'User Created Successfully',
        });
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success:false,
            message:'User cannot be registered, please try again later',
            
        });
    }
}

exports.login = async(req,res)=>{

    try{
        //first fetch the details
        const {email,password} = req.body;
        
        
        // Check the validation for email and password
        if(!email || !password)
        {
            return res.status(400).json({
                message:"Enter the email id and password."
            });
        }
        

        // Check for the email in the database
        let existingUser = await userModel.findOne({email});  //always use let here const will give error

        // if the email is there then ok if not then return error
        if(!existingUser)
        {
            return res.status(500).json({
                message:"The user don't exist please signup"
            });
        }

        // If the user is already there then login
        const payload ={
            email: existingUser.email,
            id: existingUser.id
        };

        // Verify the password and generate a JWT token or cookies.
        if(await bcrypt.compare(password , existingUser.password))
        {
            // it means that the password is correct so we will create a Jwt token for it 
            let token = jwt.sign({userId:existingUser._id},process.env.SECRET_KEY,{
                expiresIn:"1d",
            });

            res.send({
                message:"User Logged in successfully",
                success:true,
                data:token
            })

        }
        else
        {
            res.status(400).json({
                success:false,
                message:"Incorrect Password kindly , check it again",
            });
        }

    }catch(error)
    {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Login Failure',
        });
    }
}

exports.getuser = async (req, res) => {
    try {
      const user = await userModel.findById(req.body.userId);
      res.send({
        message: "User info fetched successfully",
        success: true,
        data: user,
      });
    } catch (error) {
        
      res.status(500).send({
        message: error.message,
        data: error,
        success: false,
      });
    }
  }
