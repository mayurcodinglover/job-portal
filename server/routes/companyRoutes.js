import express from "express"
import { changeJobApplicationStatus, changeVisiblity, getCompanyData, getCompanyJobApplicants, getCompanyPostedJob, loginCompany, postJob, registerCompany } from "../controllers/companyController.js";
import upload from "../config/multer.js";

const router=express.Router();

//Register a company
router.post('/register',upload.single('image'),registerCompany);

//login a company
router.post('/login',loginCompany);

//get company data
router.get('/company',getCompanyData);

//post a job
router.post('/post-job',postJob);

//get Applicants data
router.get('/applicants',getCompanyJobApplicants);

//get company job list
router.get('/list-jobs',getCompanyPostedJob);

//Change application status
router.post('/change-status',changeJobApplicationStatus);

//change job visiblity
router.post('/change-visiblity',changeVisiblity);

export default router;