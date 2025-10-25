/* eslint-disable react-refresh/only-export-components */
import { createContext,useState,useEffect } from "react";
import React from "react";
import { jobsData } from "../assets/assets";
import { useViewTransitionState } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext()

export const AppContextProvider=(props)=>{

    const backendUrl=import.meta.env.VITE_BACKEND_URL;
    const [searchFilter, setSearchFilter] = useState({
        title:"",
        location:""
    });
    const [isSearched, setIsSearched] = useState(false);
    const [Jobs, setJobs] = useState([]);
    const [showRecruiterLogin, setshowRecruiterLogin] = useState(false);
    const [companyToken, setcompanyToken] = useState(null);
    const [companyData, setcompanyData] = useState(null);

    const fetchJobs=()=>{
        setJobs(jobsData);
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
    
     useEffect(() => {
        if(companyToken)
        {
            fetchCompanyData();
        }
     }, [companyToken]);
    const value={
        searchFilter,setSearchFilter,
        isSearched,setIsSearched,
        Jobs,setJobs,
        showRecruiterLogin,
        setshowRecruiterLogin,
        companyToken,setcompanyToken,
        companyData,setcompanyData,
        backendUrl
    };
    
    

    return (<AppContext.Provider value={value}>
        {props.children}
    </AppContext.Provider>)
}