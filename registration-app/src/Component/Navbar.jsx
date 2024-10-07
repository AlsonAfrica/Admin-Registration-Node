import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import img1 from '../Images/SportsLogo.png';
import '../Styles/Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/'); // Redirect to the home page after loading
    }, 2000); // Simulate a 2-second loading time
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="#"><img src={img1} alt="Logo" className="logo-nav" /></a>
      </div>
      <button className="hamburger" onClick={toggleMenu}>
        &#9776; {/* Hamburger icon */}
      </button>
      <ul className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
        <li><Link to="/Home">Home</Link></li>
        <li><Link to="/Form">Add Employee</Link></li>
        {/* <li><Link to="">Update Profile</Link></li> */}
        <li>
          <a href="#" onClick={handleLogout}>
            {isLoading ? 'Logging Out...' : 'Log Out'}
          </a>
        </li>
      </ul>
      {isLoading && <div className="loader">Logging out...</div>}
    </nav>
  );
};

export default Navbar;
