import Company from "../models/Company.js";
import bcrypt from "bcrypt"
import {v2 as cloudinary} from "cloudinary"
import generateToken from "../utils/generateTokens.js";

//register a new company
export const registerCompany = async (req,res)=>{

        const {name,email,password}=req.body;

        const imageFile=req.file;
        if(!name || !email || !password || !imageFile)
        {
            return res.json({success:false,message:"Missing Details"});
        }
        try {
            const companyExists=await Company.findOne({email});
        if(companyExists)
        {
            return res.json({success:false,message:"Company already Registered"});
        }
        const salt=await bcrypt.genSalt(10);
        const hashPassword=await bcrypt.hash(password,salt);

        const imageUpload=await cloudinary.uploader.upload(imageFile.path);
        const company=await Company.create({
            name,email,password:hashPassword,image:imageUpload.secure_url
        });
        res.json({
            success:true,
            company:{
                _id:company._id,
                name:company.name,
                email:company.email,
                image:company.image
            },
            token:generateToken(company._id)
        })    
        } catch (error) {
            res.json({success:false,message:error.message});
        } 
}

//log in company
export const loginCompany =async (req,res)=>{
    const {email,password}=req.body;

    try {
        const company=await Company.findOne({email});

        if(await bcrypt.compare(password,company.password))
        {
            return res.json({
                success:true,
                company:{
                    _id:company._id,
                    name:company.name,
                    email:company.email,
                    image:company.image
                },
                token:generateToken(company._id)
            });
        }
        else{
            return res.json({
                success:false,
                message:"Email or password is Invalid"
            })
        }
    } catch (error) {
        res.json({success:false,message:error.message});
    }
}

//get Company data
export const getCompanyData=async (req,res)=>{

}

//post a new job
export const postJob = async (req,res)=>{

}

//get company job applicants
export const getCompanyJobApplicants=async(req,res)=>{

}

//Get company posted Job
export const getCompanyPostedJob=async(req,res)=>{

}

//change job application status
export const changeJobApplicationStatus=async (req,res)=>{

}


//change job visiblity
export const changeVisiblity = async (req,res)=>{
    
}