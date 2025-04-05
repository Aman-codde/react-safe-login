import { User } from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const registerUser = async (req,res) => {
    const {username, email, password} = req.body;
    try{
        // Check if user already exists
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json('User already exists');
        }
        //hash the password
        const hashPassword = await bcrypt.hash(password,10);
        const newUser = new User({
            username,
            email,
            password: hashPassword
        })
        // Save user to the database
        await newUser.save();

        // Create JWT token
            const access_token = jwt.sign(
                {id: newUser._id},
                process.env.JWT_SECRET,
                {expiresIn: '1h'})

        // Send back the token to frontend as a response
        res.status(201).json({token: access_token});
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
}

export const login = async (req,res) => {
    const {email, password} = req.body;
    try{
        //check if email exists
        const userFound = await User.findOne({email});
        if(!userFound){
            return res.status(404).json('Invalid email');
        }
        //check if password matches
        const matches = await bcrypt.compare(password,userFound.password);
        if(!matches){
            return res.status(404).json('Invalid password');
        }
        //generate token
        const access_token = jwt.sign(
            {userId:userFound._id},
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
        )
        //send token to frontend
        res.json({token: access_token})
    }
    catch(err){
        res.status(500).json({message: `Server error: ${err.message}`});
    }
}