import React , {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import Swal from 'sweetalert2';

const SignUpPage = () => {
  const navigate = useNavigate(); 
  let [userData, setUserData] = useState({
    name: "",
    email: "",
    pass: "",
    cpass: "",
  });
  const InputEvent = (event) => {
    const { name, value } = event.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const onSubmitFun = async(event) => {
    try{
      event.preventDefault();
      const serverUrl = "http://localhost:8070/register";
      const responce = await axios.post(serverUrl, userData);
      if(responce.status==201){
      Swal.fire({
        icon: 'success',
        title: 'Good Job',
        text: responce.data.msg,

    })
      navigate("/");
    }
    else{
      Swal.fire({
        icon: 'error',
        title: 'Oops..',
        text: responce.data.msg,
    })
    }

    }
    catch(error){
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops..',
        text: error.response?.data?.message || 'Something went wrong!',
    })
    }
  };
  
  return (
    <React.Fragment>
      <div className="containerform">
        <div className="forms-container">
          <div className="signin-signup">
            <form action="" className="sign-up-form" onSubmit={onSubmitFun} id="signup">
              <h2 className="title">Sign up</h2>
              <div className="input-field namefield">
                <i className="fas fa-user"></i>
                <input type="text" placeholder="Full Name" name="name"  onChange={InputEvent}
                value={userData.name} required autoComplete="off" maxLength="20" id="fname" />
              </div>
              <div className="input-field efield">
                <i className="fas fa-envelope"></i>
                <input type="email" placeholder="Email"  onChange={InputEvent}
                value={userData.eamil} required name="email" autoComplete="off" id="ename" />
              </div>
              <div className="input-field passfield">
                <i className="fas fa-lock"></i>
                <input type="password" placeholder="Password"  onChange={InputEvent}
                value={userData.pass} required name="pass" id="pass" className="pass1" />
                <span>
                  <i className="fa-regular fa-eye"></i>
                </span>
              </div>
              <div className="input-field passfield">
                <i className="fas fa-lock"></i>
                <input type="password" placeholder="Confirm Password"  onChange={InputEvent}
                value={userData.cpass} required name="cpass" id="confirmpass" className="pass1" />
                <span>
                  <i className="fa-regular fa-eye"></i>
                </span>
              </div>
              <button className="btn signup-btn" name="submit2">Sign up</button>
              <p className="social-text">Or Sign up with social platforms</p>
              <div className="social-media">
                <a href="#" className="social-icon">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-google"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </form>
          </div>
          <div className="panels-container">
            <div className="panel right-panel">
              <div className="content">
                <h3>Log in</h3>
                <p>Sign in here if you already have an account</p>
                <Link to="/">
                <button className="btn transparent" id="sign-in-btn">
                  Sign in
                </button>
                </Link>
              </div>
              <img src={`${process.env.PUBLIC_URL}/images/login.png`} className="image" alt="" />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SignUpPage;
