import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { assets, JobCategories, JobLocations } from "../assets/assets";
import JobCard from "./JobCard";

const JobListing = () => {
  const { jobs, isSearched, searchFilter, setSearchFilter } =
    useContext(AppContext);

  const [showFilter, setShowFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);

  // Toggle Category Selection
  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
    setCurrentPage(1);
  };

  // Toggle Location Selection
  const handleLocationChange = (location) => {
    setSelectedLocations((prev) =>
      prev.includes(location)
        ? prev.filter((l) => l !== location)
        : [...prev, location]
    );
    setCurrentPage(1);
  };

  // Filtering Logic
  const filteredJobs = jobs
    .slice()
    .reverse()
    .filter((job) => {
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(job.category);

      const matchesLocation =
        selectedLocations.length === 0 ||
        selectedLocations.includes(job.location);

      const matchesTitle =
        searchFilter.title === "" ||
        job.title
          .toLowerCase()
          .includes(searchFilter.title.toLowerCase());

      const matchesSearchLocation =
        searchFilter.location === "" ||
        job.location
          .toLowerCase()
          .includes(searchFilter.location.toLowerCase());

      return (
        matchesCategory &&
        matchesLocation &&
        matchesTitle &&
        matchesSearchLocation
      );
    });

  const totalPages = Math.ceil(filteredJobs.length / 6);

  return (
    <div className="container 2xl:px-20 mx-auto flex flex-col lg:flex-row max-lg:space-y-8 py-8">
      {/* Sidebar */}
      <div
        className={`w-full lg:w-1/4 bg-white px-4 ${
          showFilter ? "block" : "hidden"
        } lg:block`}
      >
        {isSearched && (searchFilter.title || searchFilter.location) && (
          <>
            <h3 className="font-medium text-lg mb-4">Current Search</h3>

            <div className="mb-4 text-gray-600 flex flex-wrap gap-2">
              {searchFilter.title && (
                <span className="inline-flex items-center gap-2.5 bg-blue-50 border px-4 py-1.5 rounded">
                  {searchFilter.title}
                  <img
                    onClick={() =>
                      setSearchFilter((prev) => ({ ...prev, title: "" }))
                    }
                    className="cursor-pointer"
                    src={assets.cross_icon}
                    alt=""
                  />
                </span>
              )}

              {searchFilter.location && (
                <span className="inline-flex items-center gap-2.5 bg-red-50 border px-4 py-1.5 rounded">
                  {searchFilter.location}
                  <img
                    onClick={() =>
                      setSearchFilter((prev) => ({ ...prev, location: "" }))
                    }
                    className="cursor-pointer"
                    src={assets.cross_icon}
                    alt=""
                  />
                </span>
              )}
            </div>
          </>
        )}

        {/* Categories */}
        <div>
          <h4 className="font-medium text-lg py-4">
            Search by Categories
          </h4>
          <ul className="space-y-4 text-gray-600">
            {JobCategories.map((category, index) => (
              <li className="flex gap-3 items-center" key={index}>
                <input
                  className="scale-125"
                  type="checkbox"
                  onChange={() => handleCategoryChange(category)}
                  checked={selectedCategories.includes(category)}
                />
                {category}
              </li>
            ))}
          </ul>
        </div>

        {/* Locations */}
        <div>
          <h4 className="font-medium text-lg py-4 pt-10">
            Search by Location
          </h4>
          <ul className="space-y-4 text-gray-600">
            {JobLocations.map((location, index) => (
              <li className="flex gap-3 items-center" key={index}>
                <input
                  className="scale-125"
                  type="checkbox"
                  onChange={() => handleLocationChange(location)}
                  checked={selectedLocations.includes(location)}
                />
                {location}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Job Listings */}
      <section className="w-full lg:w-3/4 text-gray-800 max-lg:px-4">
        <button
          onClick={() => setShowFilter((prev) => !prev)}
          className="lg:hidden px-6 py-1.5 rounded border border-gray-400 mb-4"
        >
          {showFilter ? "Close Filters" : "Show Filters"}
        </button>

        <h3 className="font-medium text-3xl py-2" id="job-list">
          Latest Jobs
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredJobs
            .slice((currentPage - 1) * 6, currentPage * 6)
            .map((job, index) => (
              <JobCard key={index} job={job} />
            ))}
        </div>

        {/* Pagination */}
        {filteredJobs.length > 0 && (
          <div className="flex items-center justify-center space-x-2 mt-10">
            <img
              onClick={() =>
                setCurrentPage((prev) => Math.max(prev - 1, 1))
              }
              src={assets.left_arrow_icon}
              alt=""
              className="cursor-pointer"
            />

            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`w-8 h-10 border rounded ${
                  currentPage === index + 1
                    ? "bg-blue-100 text-blue-500"
                    : "text-gray-500"
                }`}
              >
                {index + 1}
              </button>
            ))}

            <img
              onClick={() =>
                setCurrentPage((prev) =>
                  Math.min(prev + 1, totalPages)
                )
              }
              src={assets.right_arrow_icon}
              alt=""
              className="cursor-pointer"
            />
          </div>
        )}
      </section>
    </div>
  );
};

export default JobListing;
