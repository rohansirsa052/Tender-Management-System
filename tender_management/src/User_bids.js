import React from 'react';
import Navbar from './Navbar';

const User_bids = () => {
  const location = "../welcome";
  const userName = localStorage.getItem("userName");

  // Hard-coded sample data
  const bids = [
    { bidId: '66a4195d611e74a71da31219', tenderId: '66a3e8252547662b236e75f1', bidAmount: '$1200', deadline: '2024-08-10 14:00', status: 'Pending' },
    { bidId: '66a4195d611e74a71da3121b', tenderId: '66a3e8832547662b236e75f3', bidAmount: '$1500', deadline: '2024-08-15 16:00', status: 'Accepted' },
    { bidId: '66a4195d611e74a71da3121d', tenderId: '66a3e8ce2547662b236e75f5', bidAmount: '$2000', deadline: '2024-08-20 10:00', status: 'Rejected' },
    { bidId: '66a4195d611e74a71da3121f', tenderId: '66a3e8e72547662b236e75f7', bidAmount: '$2200', deadline: '2024-08-25 12:00', status: 'Pending' },
    { bidId: '66a48a1d36fb1cf1f0cf09be', tenderId: '66a488e26f94d7a2af63065f', bidAmount: '$2500', deadline: '2024-08-30 18:00', status: 'Accepted' }
  ];

  return (
    <div>
      <Navbar gradient="linear-gradient(-45deg, #810ae6 0%, #a470d0 100%)" Location={location} pannelName={"User Pannel"} />
      <div className="container-fluid mt-5">
        <div className="main-heading">
          <h1 className="mb-5 text-center"><span className="heading-span">All the bids placed by {userName}</span></h1>
        </div>
        <div className="table-container">
          <table className="table table-hover">
            <thead className='table-dark'>
              <tr>
                <th>Bid id</th>
                <th>Tender id</th>
                <th>Bid amount</th>
                <th>Deadline</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bids.map((bid, index) => (
                <tr key={index}>
                  <td>{bid.bidId}</td>
                  <td>{bid.tenderId}</td>
                  <td>{bid.bidAmount}</td>
                  <td>{bid.deadline}</td>
                  <td>{bid.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default User_bids;
