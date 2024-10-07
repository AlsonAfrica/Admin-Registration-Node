import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth'; // Import Firebase authentication
import { auth } from '../Firebase/firebaseConfig';
import '../Styles/Loginform.css';
import { GiJumpAcross } from "react-icons/gi";
import { SiGnuprivacyguard } from "react-icons/si";
import { MdAdminPanelSettings } from "react-icons/md";
import { FaFileSignature } from "react-icons/fa";
import img1 from '../Images/SportsLogo.png';

const LoginForm = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  
    // Sign in using Firebase authentication
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
      alert("Login successful");
      navigate('/home'); // Navigate to the home page after login
    } catch (error) {
      setError("Invalid credentials or user does not exist");
    }
  };

  return (
    <div className="wrapper">
      <div className="form-container">
        <div className="form">
          <form onSubmit={handleSubmit}>
            <div className="logo-container">
              <img src={img1} alt="Logo" className="logo" />
            </div>
            <h1>Hi Admin</h1>
            {error && <p className="error-message">{error}</p>}
            <div>
              <input 
                type="email" 
                name="email" 
                placeholder="Email" 
                value={credentials.email} 
                onChange={handleChange} 
                required 
              />
              <MdAdminPanelSettings />
            </div>
            <div className="input-box">
              <input 
                type="password" 
                name="password" 
                placeholder="Key" 
                value={credentials.password} 
                onChange={handleChange} 
                required 
              />
              <SiGnuprivacyguard />
            </div>
            <div className="button-container">
              <button type="submit" className="log-btn">Jump-In <GiJumpAcross /></button>
              <Link to="/RegisterPage">
                <button type="button" className="sign-btn">Sign-up <FaFileSignature /></button>
              </Link>
              <p className="forgot-password">"CHAMPION YOUR TEAM"</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
