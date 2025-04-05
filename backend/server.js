import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

//connect to mongodb
connectDB();

// Rest API: register user
app.post('/api/auth',authRoutes)

/*
// Rest API: register user
app.post('/api/auth/register', async (req,res) => {
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

        // Send back the token as a response
        res.status(201).json({token: access_token});
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
})
*/

app.listen(PORT, () => {
    console.log(`Server is listening to http://localhost:${PORT}`);
})

//node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
