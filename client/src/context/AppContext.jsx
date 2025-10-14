/* eslint-disable react-refresh/only-export-components */
import { createContext,useState,useEffect } from "react";
import React from "react";
import { jobsData } from "../assets/assets";
import { useViewTransitionState } from "react-router-dom";

export const AppContext = createContext()

export const AppContextProvider=(props)=>{

    const [searchFilter, setSearchFilter] = useState({
        title:"",
        location:""
    });
    const [isSearched, setIsSearched] = useState(false);
    const [Jobs, setJobs] = useState([]);
    const [showRecruiterLogin, setshowRecruiterLogin] = useState(false);

    const fetchJobs=()=>{
        setJobs(jobsData);
    }
    useEffect(() => {
      fetchJobs()
    }, [])
    const value={
        searchFilter,setSearchFilter,
        isSearched,setIsSearched,
        Jobs,setJobs,
        showRecruiterLogin,
        setshowRecruiterLogin
    };
    
    

    return (<AppContext.Provider value={value}>
        {props.children}
    </AppContext.Provider>)
}