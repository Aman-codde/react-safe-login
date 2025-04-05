import mongoose from "mongoose";
import bcrypt from "bcryptjs";

/*
// Hashing a password
const hashedPassword = await bcrypt.hash("myPassword", 10);

// Comparing passwords
const isMatch = await bcrypt.compare("myPassword", hashedPassword);
*/

const userSchema = new mongoose.Schema({
    username: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});

async function hashPassword(password){
    return bcrypt.hash(password,10);
}

// mongoose 'pre' middleware
userSchema.pre('save', async function(next){
    // check if password is not modified, 
    // the next() function is called immediately, skipping the hashing.
    if(!this.isModified('password')) return next();
    
    //Now, the password will only be hashed when it's modified (e.g., during registration or when the user changes their password)
    this.password = await hashPassword(this.password);

    // After the password is hashed (if necessary), the next() function 
    // is called to proceed with saving the document.
    next();//continue to next step
})

export const User = mongoose.model('User', userSchema)