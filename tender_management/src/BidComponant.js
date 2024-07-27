import React, { useState } from 'react';

const BidComponant = ({ Name, Description, StartTime, EndTime, Status, Cost }) => {
  const [flagged, setFlagged] = useState(false);

  const handleBidNow = () => {
    const currentTime = new Date();
    const endTime = new Date(EndTime);
    const fiveMinutes = 5 * 60 * 1000; // 5 minutes in milliseconds

    // Check if the bid was placed within the last 5 minutes before the end time
    if (endTime - currentTime <= fiveMinutes) {
      setFlagged(true);
    } else {
      setFlagged(false);
    }
  };

  return (
    <React.Fragment>
      <div className="container-fluid mt-2">
        <div className="main-heading">
          <h1 className="mb-5 text-center"><span className="heading-span">Bid Details</span></h1>
        </div>
        <div className="table-container">
          <table className="table table-bordered">
            <tbody>
              <tr>
                <th className="table-title">Tender Name :</th>
                <td className="table-data">{Name}</td>
              </tr>
              <tr>
                <th className="table-title">Deadline Reqd :</th>
                <td className="table-data">{new Date(EndTime).toLocaleString()}</td>
              </tr>
              <tr>
                <th className="table-title">Base Price :</th>
                <td className="table-data">{Cost}</td>
              </tr>
              <tr>
                <th className="table-title">Description :</th>
                <td className="table-data">{Description}</td>
              </tr>
              <tr>
                <th className="table-title">Status :</th>
                <td className="table-data">{Status}</td>
              </tr>
              <tr>
                <td colSpan="2" className="table-data">
                  <button className="btn w-btn" onClick={handleBidNow}>
                    Bid Now 2
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          {flagged && <div className="alert alert-warning mt-3">You are bidding within the last 5 minutes of the tender end time!</div>}
        </div>
      </div>
    </React.Fragment>
  );
};

export default BidComponant;
