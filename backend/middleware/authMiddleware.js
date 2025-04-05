import jwt from "jsonwebtoken";

export const authMiddleware = (req,res,next) => {
    const authHeader = req.headers.Authorization;
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({message: 'Authorization token missing or malformed'})
    }
    const token = authorized.split(" ")[1];
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
        if(!decoded){
            return res.status(400).json('Invalid token')
        }

        req.userId = decoded.userId;
        next();
    }
    catch(err){
        res.status(401).json({message: `Invalid or expired token ${err.message}`})
    }
}