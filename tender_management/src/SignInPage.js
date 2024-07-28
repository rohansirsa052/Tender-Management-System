import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import './App.css';
import axios from 'axios';
const SignInPage = () => {

    let [loginData, setloginData] = useState({
        email: "",
        pass: "",
      });
      const InputEvent = (event) => {
        const { name, value } = event.target;
        setloginData((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      };
      const handleClick = async(e, url, redirectPath) => {
          try{
              const response= await axios.post(url, loginData);
              const userName = response.data.name;
              localStorage.setItem("userName", userName);
              window.location.href = redirectPath;
          }
          catch (error){
            alert("Error: " + error.response.data || error.message);
            console.error("Error logging in:", error);
          }
      };
    
      const handleClick1 = (e) => handleClick(e, "http://localhost:8070/login", "./welcome");
      const handleClick2 = (e) => handleClick(e, "http://localhost:8070/admin_login", "./welcome2");
    
  return (
    <React.Fragment>
      <div className="containerform">
        <div className="forms-container">
          <div className="signin-signup">
            <form className="sign-in-form" id="signin">
              <h2 className="title">Sign in</h2>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input type="text" placeholder="Email" name="email" autoComplete="off" id="emailname" onChange={InputEvent} value= {loginData.email} />
              </div>
              <div className="input-field passfield">
                <i className="fas fa-lock"></i>
                <input type="password" placeholder="Password" name="pass" id="passname" className="pass1" onChange={InputEvent} value= {loginData.pass} />
                <span>
                  <i className="fa-regular fa-eye"></i>
                </span>
              </div>
              <input type="submit" value="Sign in as user" name="submit" className="btn solid" onClick={handleClick1}  />
              <input type="submit" value="Sign in admin" name="submit" className="btn solid" onClick={handleClick2}  />
              <p className="social-text">Or Sign in with social platforms</p>
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
            <div className="panel left-panel">
              <div className="content">
                <h3>Create Account</h3>
                <p>Sign up if you still don't have an account ...</p>
                <Link to="/Signup">
                    <button className="btn transparent" id="sign-up-btn">
                    Sign up
                    </button>
                </Link>       
              </div>
              <img src="../images/sigup_img.png" className="image" alt="" />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default SignInPage
