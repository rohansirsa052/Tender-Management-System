import React, { useState } from 'react';
import Navbar from './Navbar';
import "./App.css";
import axios from 'axios';
import Swal from 'sweetalert2';

const NewTender = () => {
  const location = "../welcome2";

  const [tenderData, setTenderData] = useState({
    name: '',
    description: '',
    startTime: '',
    endTime: '',
    bufferTime: ''
  });

  const InputEvent = (event) => {
    const { name, value } = event.target;
    setTenderData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmitFun = async (event) => {
    event.preventDefault();
    const serverUrl = "http://localhost:8070/tenders";
    try {
      const response = await axios.post(serverUrl, tenderData);
      console.log(response.data);
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Tender added successfully!',
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Something went wrong!',
      });
      console.error("Error adding the tender:", error);
    }
    // Handle form submission logic here
  };

  return (
    <React.Fragment>
      <Navbar gradient="linear-gradient(-45deg, #810ae6 0%, #a470d0 100%)" Location={location} pannelName={"Admin Pannel"} />
      <div className="containerform">
        <div className="forms-container">
          <div className="signin-signup">
            <form className="sign-up-form" onSubmit={onSubmitFun} id="signup">
              <h2 className="title">New Tender</h2>
              <div className="input-field">
                <i className="fas fa-file-alt"></i>
                <input
                  type="text"
                  placeholder="Tender Name"
                  name="name"
                  onChange={InputEvent}
                  value={tenderData.name}
                  required
                  autoComplete="off"
                  maxLength="50"
                />
              </div>
              <div className="input-field">
                <i className="fas fa-info-circle"></i>
                <input
                  type="text"
                  placeholder="Tender Description"
                  name="description"
                  onChange={InputEvent}
                  value={tenderData.description}
                  required
                  autoComplete="off"
                  maxLength="200"
                />
              </div>
              <div className="input-field">
                <i className="fas fa-calendar-alt"></i>
                <input
                  type="datetime-local"
                  placeholder="Start Time"
                  name="startTime"
                  onChange={InputEvent}
                  value={tenderData.startTime}
                  required
                />
              </div>
              <div className="input-field">
                <i className="fas fa-calendar-alt"></i>
                <input
                  type="datetime-local"
                  placeholder="End Time"
                  name="endTime"
                  onChange={InputEvent}
                  value={tenderData.endTime}
                  required
                />
              </div>
              <div className="input-field">
                <i className="fas fa-hourglass-half"></i>
                <input
                  type="number"
                  placeholder="Buffer Time (minutes)"
                  name="bufferTime"
                  onChange={InputEvent}
                  value={tenderData.bufferTime}
                  required
                  min="0"
                />
              </div>
              <button className="btn signup-btn" type="submit">Submit Tender</button>
            </form>
          </div>
          <div className="panels-container">
            <div className="panel right-panel">
              <img src="../images/tender.png" className="image" alt="" />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default NewTender;
