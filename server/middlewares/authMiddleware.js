import jwt from "jsonwebtoken";
import Company from "../models/Company.js"

const protectCompany=async(req,res,next)=>{
    const token=req.headers.token;

    if(!token)
    {
        return res.json({success:false,message:"Not Authorized Sign in again"});
    }

    try {
        const decode=await jwt.decode(token,process.env.JWT_SECRET);
        req.company=await Company.findById(decode.id).select("-password");
        next();
    } catch (error) {
        res.json({success:false,message:error.message});
    }
}

export default protectCompany;