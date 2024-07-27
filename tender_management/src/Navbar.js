import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ gradient, Location, pannelName}) => {
    const [userName, setUserName] = useState('');

    useEffect(() => {
      const storedUserName = localStorage.getItem("userName");
      if (storedUserName) {
        setUserName(storedUserName);
      }
    }, []);

    const dropdownOptions = {
      admin: [
        { path: '/create-new-tender', label: 'Create New Tender' },
        { path: '/view-assigned-tenders', label: 'View Assigned Tenders' }
      ],
      user: [
        { path: '/bid-tender', label: 'Available Tenders' },
        { path: '/view-my-tenders', label: 'Display All Bids' }
      ]
    };
    let options = [];

    if(pannelName === "User Pannel") {
      options = dropdownOptions.user;
    } else if(pannelName === "Admin Pannel") {
      options = dropdownOptions.admin;
    }
    // console.log(options);
  return (
   <React.Fragment>
   <nav
   className="navbar navbar-expand-lg navbar-dark"
   style={{
    backgroundImage: gradient  
   }}
 >
 
   <div className="container">
     <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas"
       data-bs-target="#navbarOffcanvas" aria-controls="navbarOffcanvas" aria-expanded="false"
       aria-label="Toggle navigation">
       <iconify-icon icon="fe:bar" style={{ color: 'white' }} width="28" height="28"
         className="baricon"></iconify-icon>
     </button>
     <div className="logo">
       <a className="navbar-brand" href="/form.html">{pannelName}</a>
     </div>
     <div className="navbarnav d-inline-flex">
       <ul className="navbar-nav mr-auto w-100 d-sm-none d-md-none d-lg-inline-flex d-none justify-content-end">
         <li className="nav-item active">
         <Link className="nav-link" to={Location}>Home</Link>
         </li>
         <li className="nav-item">
           <a className="nav-link" href="#">About</a>
         </li>
         <li className="nav-item dropdown">
           <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
             Tender
           </a>
           <div className="dropdown-menu" aria-labelledby="navbarDropdown">
             {options.map(option => (
              
               <Link key={option.path} className="dropdown-item" to={option.path}>{option.label}</Link>
             ))}
           </div>
         </li>
         <li className="nav-item">
           <a className="nav-link" href="#">Contact</a>
         </li>
       </ul>
       <ul className="navbar-nav navbarul navbar-icon d-md-inline-flex d-sm-inline-flex d-inline-flex align-items-center">
         <li className="nav-item person-icon">
           <iconify-icon icon="octicon:feed-person-16" style={{ color: 'white' }} width="24" height="24"></iconify-icon>
         </li>
         <li className="nav-item user">
           <span id="uname">{userName}</span>
         </li>
       </ul>
     </div>

     <div className="offcanvas offcanvas-start bg-canvas" id="navbarOffcanvas" tabIndex="-1"
       aria-labelledby="offcanvasNavbarLabel">
       <div className="offcanvas-header">
         <h5 className="offcanvas-title text-light" id="offcanvasNavbarLabel"></h5>
         <button type="button" className="btn-close btn-close-white text-reset"
           data-bs-dismiss="offcanvas" aria-label="Close"></button>
       </div>
       <div className="offcanvas-body">
         <div className="navbar-nav justify-content-end flex-grow-1 pe-3">
           <a className="menu-item m-3" aria-current="page" href="#">Home</a>
           <a className="menu-item m-3" href="#">About</a>
           <div className="nav-item dropdown">
             <a className="nav-link dropdown-toggle" href="#" id="offcanvasDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
               Tender
             </a>
             <div className="dropdown-menu" aria-labelledby="offcanvasDropdown">
               {options.map(option => (
                 <Link key={option.path} className="dropdown-item" to={option.path}>{option.label}</Link>
               ))}
             </div>
           </div>
           <a className="menu-item m-3" href="#">Contact</a>
         </div>
       </div>
     </div>
   </div>
 </nav>
   </React.Fragment>
  )
}

export default Navbar;
