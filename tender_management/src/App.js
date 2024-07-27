import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
 import SignUpPage from './SignUpPage';
import SignInPAge from './SignInPage';
import Welcome from './Welcome';
import Welcome2 from './welcome2';
import NewTender from './NewTender';
import Bid from './Bid';
import User_bids from './User_bids';
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<SignInPAge />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/welcome2" element={<Welcome2/>} />
      <Route path="/create-new-tender" element={<NewTender/>} />
      <Route path="/bid-tender" element={<Bid/>} />
      <Route path="/view-my-tenders" element={<User_bids/>} />
    </Routes>
  
  
  </BrowserRouter>
  );
  
}

export default App;



