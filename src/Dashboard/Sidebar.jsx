import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./Sidebar.css"; // Import your CSS file for custom styles
const Sidebar = () => {
  const [searchQuery, setSearchQuery] = useState(""); // State to store search query
  const [filteredLinks, setFilteredLinks] = useState([]); // State to store filtered links

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    // Filter links based on the search query
    const filtered = links.filter((link) =>
      link.text.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredLinks(filtered);
  };

  // Definition of list of links
  const links = [
    { to: "/", text: "Dashboard", description: "Main summary of AskField Projects" },
    { to: "/charts", text: "Chart types", description: "Switch from many chart types" },
    { to: "/crossTabulation", text: "Analysis & visualization", description: "Cross tabulation,charts and statistical analysis" },
  ];
  
  const renderLinks = () => {
    const linksToRender = searchQuery ? filteredLinks : links;
    return linksToRender.map((link, index) => (
      <Link key={index} to={link.to} className="list-group-item list-group-item-action">
        <div className="d-flex justify-content-between">
          <h6 className="mb-1">{link.text}</h6>
        </div>
        <p className="mb-1">{link.description}</p>
      </Link>
    ));
  };

  return (
    <div className="sidebar-container">
      <div className="sidebar">
        <div className="input-group mb-1 mt-1">
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="Search..."
            aria-label="Search"
            aria-describedby="search-icon"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <div className="input-group-append">
            <button className="btn btn-outline-secondary" type="button" id="search-icon">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
        </div>
        <div className="list-group">{renderLinks()}</div>

      </div>
    </div>
  );
};
export default Sidebar;
