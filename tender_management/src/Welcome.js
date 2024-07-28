import React, {  useEffect, useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import TendersList from './TendersList';
// import { UserContext } from './context';
import "./App.css";

const Welcome = () => {
  const [userName, setUserName] = useState('');
  const [tenderList, settenderList] = useState([]);
  const [showTenders, setShowTenders] = useState(false); // New state for controlling visibility
  const location= "welcome";
  const quotation= "Add a Quotation"
    useEffect(() => {
      const storedUserName = localStorage.getItem("userName");
      if (storedUserName) {
        setUserName(storedUserName);
      }
    }, []);
    const showAllTender = async() => {
     try{
      const serverUrl = "http://localhost:8070/tenders";
       const result=  await axios.get(serverUrl);
       const response= result.data;
       settenderList(response);
       setShowTenders(true); // Set the state to show tenders
     }
     catch(err){
      console.log("Error receiving data:", err)
     }
  }
  
 
  return (
    <React.Fragment>
      <header>
        <div className="container-fluid w-containerfluid">
        <Navbar Location={location} pannelName={"User Pannel"} />

          <div className="container">
            <div className="row w-section">
              <div className="col-lg-6 w-head text-white">
                <h2> Hey dude Welcome to our tender management System, {userName}</h2>
                <p className="text-light">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Blanditiis maiores culpa illo voluptatibus voluptates maxime ipsum ea ab consequuntur dicta! Saepe libero eum sed eaque porro iure unde debitis aut!</p>
                <button className="btn w-btn" onClick={showAllTender}>Show all Tender</button>
              </div>
              <div className="col-lg-6 w-img img-fluid">
                <img src="./images/welcome-img.png" alt="Welcome" />
              </div>
            </div>
          </div>
        </div>
      </header>
      {showTenders && <TendersList TenderList={tenderList} Quotation={quotation} pannelName={"User Pannel"} />}
    </React.Fragment>
  );
}

export default Welcome;
