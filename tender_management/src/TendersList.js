import React, { useState, useEffect } from 'react';
import "./TenderList.css";

const TendersList = ({ TenderList, Quotation, pannelName }) => {
  const [userPannel, setUserPannel] = useState(false);

  useEffect(() => {
    if (pannelName === "User Pannel") {
      setUserPannel(true);
    } else {
      setUserPannel(false);
    }
  }, [pannelName]);
  const handleClick = () => {
    const quote = prompt("Enter the quote");
    if (quote !== null) {
      // Do something with the quote (e.g., console.log(quote), store it in a variable)
      alert("Quote submitted successfully");
    }
  };
  console.log(TenderList);

  return (
    <div className="container-fluid mt-5">
      <div className="main-heading">
        <h1 className="mb-5 text-center"><span className="heading-span">Tenders List</span></h1>
      </div>
      <div className="table-container">
        <table className="table table-hover">
          <thead className='table-dark'>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Buffer Time</th>
              {userPannel && <th>Quotation</th>}
            </tr>
          </thead>
          <tbody>
            {TenderList.map((tender) => (
              <tr key={tender._id}>
                <td>{tender.name}</td>
                <td>{tender.description}</td>
                <td>{tender.startTime}</td>
                <td>{tender.endTime}</td>
                <td>{tender.bufferTime}</td>
                {userPannel && <td> <button className='btn w-btn' onClick={handleClick} >  {Quotation} </button></td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TendersList;
