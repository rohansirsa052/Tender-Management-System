import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import BidComponant from './BidComponant'; // Adjust the import according to your file structure

const Bid = () => {
  const [bids, setBids] = useState([]);
  const [showBid, setShowBid] = useState(false);
  const [tenderName, setTenderName] = useState('');
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [bidStatus, setBidStatus] = useState('');
  const [bidCost, setBidCost] = useState('');

  const location = "../welcome";

  const fetchAllBids = async () => {
    try {
      const response = await axios.get('http://localhost:8070/bids');
      setBids(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchAllBids();
  }, []);

  const handleClick = async (bid_id) => {
    try {
      const response = await axios.get(`http://localhost:8070/bids/${bid_id}`);
      const actualData = response.data;
      setTenderName(actualData.tender.name);
      setDescription(actualData.tender.description);
      setStartTime(actualData.tender.startTime);
      setEndTime(actualData.tender.endTime);
      setBidStatus(actualData.status);
      setBidCost("$2200");
      setShowBid(true);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <React.Fragment>
      <Navbar gradient="linear-gradient(-45deg, #810ae6 0%, #a470d0 100%)" Location={location} pannelName={"User Pannel"} />
      <div className="container-fluid mt-5">
        <div className="main-heading">
          <h1 className="mb-5 text-center"><span className="heading-span">Tenders List</span></h1>
        </div>
        <div className="table-container">
          <table className="table table-hover">
            <thead className='table-dark'>
              <tr>
                <th>Tender Name</th>
                <th>Description</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Buffer Time</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {bids.map((bid) => (
                <tr key={bid._id}>
                  <td>{bid.tender.name}</td>
                  <td>{bid.tender.description}</td>
                  <td>{new Date(bid.tender.startTime).toLocaleString()}</td>
                  <td>{new Date(bid.tender.endTime).toLocaleString()}</td>
                  <td>{bid.tender.bufferTime}</td>
                  <td>{bid.status}</td>
                  <td>
                    <button className="btn w-btn" onClick={() => handleClick(bid._id)}>
                      {bid.action}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showBid && 
        <BidComponant 
          Name={tenderName} 
          Description={description} 
          StartTime={startTime} 
          EndTime={endTime} 
          Status={bidStatus} 
          Cost={bidCost} 
        />
      }
    </React.Fragment>
  );
};

export default Bid;
