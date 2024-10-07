import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase/firebaseConfig';
import '../Styles/Register.css';
import img1 from '../Images/SportsLogo.png';

const Register = () => {
  const [user, setUser] = useState({
    userName: '',
    password: '',
    confirmPassword: '',
    email: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };


   // Register the user in firestore
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (user.password !== user.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, user.email, user.password);
      alert("Registration successful");
      setUser({
        userName: '',
        password: '',
        confirmPassword: '',
        email: ''
      });
      navigate('/'); // Redirect to login page or homepage
    } catch (error) {
      setError(error.message);
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
            <h1>Create<br />Account</h1>
            {error && <p className="error-message">{error}</p>}
            <div>
              <input 
                type="text" 
                name="userName" 
                placeholder="UserName" 
                value={user.userName} 
                onChange={handleChange} 
                required 
              />
            </div>
            <div className="input-box">
              <input 
                type="password" 
                name="password" 
                placeholder="New Key" 
                value={user.password} 
                onChange={handleChange} 
                required 
              />
            </div>
            <div className="input-box">
              <input 
                type="password" 
                name="confirmPassword" 
                placeholder="Confirm Key" 
                value={user.confirmPassword} 
                onChange={handleChange} 
                required 
              />
            </div>
            <div className="input-box">
              <input 
                type="email" 
                name="email" 
                placeholder="Email" 
                value={user.email} 
                onChange={handleChange} 
                required 
              />
            </div>
            <div className="button-container">
              <button type="submit" className="sub-btn">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
