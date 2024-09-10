const EmployeeGrid = () => {
  return (
    <div className="grid-sub-container">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="grid-item">
          <p>hello</p>
        </div>
      ))}
    </div>
  );
};

export default EmployeeGrid;
