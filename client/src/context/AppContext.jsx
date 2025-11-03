/* eslint-disable react-refresh/only-export-components */
import { createContext,useState,useEffect } from "react";
import React from "react";
import { jobsData } from "../assets/assets";
import { useViewTransitionState } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import {useAuth, useUser} from "@clerk/clerk-react"

export const AppContext = createContext()

export const AppContextProvider=(props)=>{

    const backendUrl=import.meta.env.VITE_BACKEND_URL;
    const {user}=useUser();
    const {getToken}=useAuth();
    const [searchFilter, setSearchFilter] = useState({
        title:"",
        location:""
    });
    const [isSearched, setIsSearched] = useState(false);
    const [Jobs, setJobs] = useState([]);
    const [showRecruiterLogin, setshowRecruiterLogin] = useState(false);
    const [companyToken, setcompanyToken] = useState(null);
    const [companyData, setcompanyData] = useState(null);
    const [userData,setUserData]=useState(null);
    const [userApplications,setUserApplications]=useState([]);

    const fetchJobs=async()=>{
        try {
            const {data}=await axios.get(backendUrl+"/api/jobs");
            if(data.success)
            {
                setJobs(data.jobs);
                console.log(data.jobs);
            }
            else{
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    //Fetch company Data
    const fetchCompanyData=async()=>{
        try {
            const {data}=await axios.get(backendUrl+"/api/company/company",{headers:{token:companyToken}})
            if(data.success)
            {
                setcompanyData(data.company);
                console.log(data);
                
            }
            else{
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }
    useEffect(() => {
      fetchJobs()
      const storedCompanyToken=localStorage.getItem("companyToken");
      if(storedCompanyToken)
      {
        setcompanyToken(storedCompanyToken);
      }
    }, [])

    //Function to fetch user data
    const fetchUserData=async()=>{
        try {
            const token=await getToken();
            console.log(token);
            const {data}=await axios.get(backendUrl+'/api/users/user',
                {headers:{Authorization:`Bearer ${token}`}}
            )
            if(data.success)
            {
                setUserData(data.user);
            }
            else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message); 
        }
    }
    const fetchUserApplications=async()=>{
        try {
            const token=await getToken();
            const {data}=await axios.get(backendUrl+"/api/users/applications",
                {headers:{Authorization:`Bearer ${token}`}}
            );
            if(data.success)
            {
                setUserApplications(data.applications)
            }
            else{
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }
    
     useEffect(() => {
        if(companyToken)
        {
            fetchCompanyData();
        }
     }, [companyToken]);

     useEffect(()=>{
        if(user)
        {
            fetchUserData();
            fetchUserApplications();
        }
     },[user])
    const value={
        searchFilter,setSearchFilter,
        isSearched,setIsSearched,
        Jobs,setJobs,
        showRecruiterLogin,
        setshowRecruiterLogin,
        companyToken,setcompanyToken,
        companyData,setcompanyData,
        backendUrl,
        userData,setUserData,
        userApplications,setUserApplications,
        fetchUserData,
        fetchUserApplications
    };
    
    

    return (<AppContext.Provider value={value}>
        {props.children}
    </AppContext.Provider>)
}