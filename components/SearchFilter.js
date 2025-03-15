import React from "react";

export default function SearchFilter({ onSearch, onFilterChange }) {
  return (
    <div className="search-filter-wrapper">
      {/* Search Box */}
      <input
        type="text"
        className="search-box"
        placeholder="Search tickets..."
        onChange={(e) => onSearch(e.target.value)}
      />

      {/* Dropdown Filter */}
      <select className="filter-dropdown" onChange={(e) => onFilterChange(e.target.value)}>
        <option value="">All Categories</option>
        <option value="bug">Bug</option>
        <option value="feature">Feature Request</option>
        <option value="support">Support</option>
        <option value="Others"> Others</option>
      </select>
    </div>
  );
}
