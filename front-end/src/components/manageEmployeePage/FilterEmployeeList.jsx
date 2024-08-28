const FilterEmployeeList = ({ handleFiltering, filterKey }) => {
  const filterOptions = {
    "jobTitle-asc": { sortBy: "jobTitle", order: "asc" },
    "updatedAt-asc": { sortBy: "updatedAt", order: "asc" },
    "lastName-asc": { sortBy: "lastName", order: "asc" },
    "lastName-desc": { sortBy: "lastName", order: "desc" },
  };

  const handleFilter = (e) => {
    const selectedKey = e.target.value;
    handleFiltering(filterOptions[selectedKey], selectedKey);
  };

  return (
    <div className="box">
      <p>Sort By:</p>
      <div className="select">
        <select value={filterKey} onChange={handleFilter}>
          <option value="updatedAt-asc">Last Updated (Oldest First)</option>
          <option value="jobTitle-asc">Job Title</option>
          <option value="lastName-asc">Lastname A-Z</option>
          <option value="lastName-desc">Lastname Z-A</option>
        </select>
      </div>
    </div>
  );
};

export default FilterEmployeeList;
