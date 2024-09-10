const DateGrid = ({ data }) => {
  // Create an array of 21 items (7 columns * 3 rows) filled with null
  const gridItems = new Array(8).fill(null);

  // Insert the data into the first 7 positions
  for (let i = 0; i < 7; i++) {
    gridItems[i + 1] = data[i];
  }

  return (
    <div className="grid-sub-container">
      {gridItems.map((item, index) => (
        <div key={index} className="grid-item">
          {item ? (
            <div>
              <p>{item.dayOfWeek}</p>
              <div className="date-grouped">
                <p>{item.month}/</p>
                <p>{item.ordinalDate}</p>
              </div>
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default DateGrid;

// TODO => GRID DATES HAVE BEEN IMPLEMENTED NOW. MAKE THIS CURRENT CREATEGRID FUNCTION ADAPTABLE FOR EMPLOYEE DATA ADDITION.
