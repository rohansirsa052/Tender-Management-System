import React, {  useEffect, useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import TendersList from './TendersList';
// import { UserContext } from './context';
import "./App.css";

const Welcome = () => {
  const [userName, setUserName] = useState('');
  const [taskList, setTaskList] = useState([]);
  const [showTenders, setShowTenders] = useState(false); // New state for controlling visibility
  const location= "welcome";
  const quotation= "Add a Quotation"
    useEffect(() => {
      const storedUserName = localStorage.getItem("userName");
      if (storedUserName) {
        setUserName(storedUserName);
      }
    }, []);
    const showAllTender = () => {
      const serverUrl = "http://localhost:8070/tenders";
      axios
      .get(serverUrl)
      .then((response) => {
        // console.log(response.data);
        setTaskList(response.data);
        setShowTenders(true); // Set the state to show tenders
      })
      .catch((error) => {
        console.error("Error receiving data:", error);
      });
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
      {showTenders && <TendersList TenderList={taskList} Quotation={quotation} pannelName={"User Pannel"} />}
    </React.Fragment>
  );
}

export default Welcome;
