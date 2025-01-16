import React, { useState,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import img1 from '../Images/SportsLogo.png';
import '../Styles/Navbar.css';
import {onAuthStateChanged } from 'firebase/auth';
import { auth } from '../Firebase/firebaseConfig';
import { getFirestore,doc,getDoc } from 'firebase/firestore';
import { db } from '../Firebase/firebaseConfig';

const Navbar = () => {
  // States
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userposition, setUserPosition]= useState(null)
  const navigate = useNavigate();
 

  // Defined user id globally outside the scope
  let UserId = null;

  // Hamburger
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Handle Logout
  const handleLogout = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/'); 
    }, 2000); 
  };


// Retrieve user id
const getUserId = (callback)=>{
  onAuthStateChanged(auth, (user)=>{
    if (user){
      console.log(user)
      UserId = user.uid;
      console.log(UserId)
      callback(UserId);
    } else{
       console.log("user not found")
     }
   })
}
   

// Fetch user position by id
const fetchUserPosition = async (UserId) => {
  try {
    // Query the first collection (mini-admins)
    const userDocRef1 = doc(db, "mini-admins", UserId);
    const userDoc1 = await getDoc(userDocRef1);

    // Query the second collection (admins)
    const userDocRef2 = doc(db, "admins", UserId);
    const userDoc2 = await getDoc(userDocRef2);

    if (userDoc1.exists()) {
      const userData1 = userDoc1.data();
      console.log("User Data from mini-admins:", userData1);
      const userPosition = userData1.position;
      console.log("This is my position from mini-admins", userPosition);
      setUserPosition(userPosition);

    } else if (userDoc2.exists()) {
      const userData2 = userDoc2.data();
      console.log("User Data from admins:", userData2);
      const userPosition = userData2.role;
      setUserPosition(userData2.role)
      console.log("This is my position from admins", userPosition);
      setUserPosition(userPosition);

    } else {
      console.log("No such user document found in both collections!");
    }
  } catch (error) {
    console.error("Error fetching user details:", error);
  }
};


// Receive User position by id
useEffect(()=>{
  getUserId((id)=>{
    console.log("this is the user id",UserId);
    fetchUserPosition(UserId);
})
},[])

// console.log for data tracking 
console.log("this is my position again",userposition);


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
        {
          userposition === "System-admin" && (
            <>
              <li><Link to="/AddAdmins">Add Admins</Link></li>
              <li><Link to="/AdminTablePage">Admins</Link></li>
              <li><Link to="/ProfilePage">Profile</Link></li>
            </>
             
          )
        } 
        <li><Link to="/Form">Add Employee</Link></li>
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


