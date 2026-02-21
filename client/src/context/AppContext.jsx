/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";
import { jobsData } from "../assets/assets";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [searchFilter, setSearchFilter] = useState({
    title: "",
    location: "",
  });

  const [isSearched, setIsSearched] = useState(false);

  // Initialize directly from local data
  const [jobs, setJobs] = useState(jobsData);

  const [showRecruiterLogin,setShowRecruiterLogin]=useState(false)

  const fetchJobs = async () => {
    // Later replace with API call
    setJobs(jobsData);
  };

  const value = {
    searchFilter,
    setSearchFilter,
    isSearched,
    setIsSearched,
    jobs,
    setJobs,
    fetchJobs,
    showRecruiterLogin,setShowRecruiterLogin,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
