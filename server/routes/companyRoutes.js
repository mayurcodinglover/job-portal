import express from "express"
import { changeJobApplicationStatus, changeVisiblity, getCompanyData, getCompanyJobApplicants, getCompanyPostedJob, loginCompany, postJob, registerCompany } from "../controllers/companyController.js";
import upload from "../config/multer.js";
import protectCompany from "../middlewares/authMiddleware.js";

const router=express.Router();

//Register a company
router.post('/register',upload.single('image'),registerCompany);

//login a company
router.post('/login',loginCompany);

//get company data
router.get('/company',protectCompany,getCompanyData);

//post a job
router.post('/post-job',protectCompany,postJob);

//get Applicants data
router.get('/applicants',protectCompany,getCompanyJobApplicants);

//get company job list
router.get('/list-jobs',protectCompany,getCompanyPostedJob);

//Change application status
router.post('/change-status',protectCompany,changeJobApplicationStatus);

//change job visiblity
router.post('/change-visiblity',protectCompany,changeVisiblity);

export default router;