import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth,db,storage } from '../Firebase/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import '../Styles/Register.css';
import img1 from '../Images/SportsLogo.png';

const Register = () => {
  const [user, setUser] = useState({
    userName: '',
    surname: '',
    age: '',
    password: '',
    confirmPassword: '',
    email: '',
    role: 'System-admin', // default value for role
    photo: null, // to store the photo file
  });
  
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setUser({ ...user, photo: e.target.files[0] });
  };

  // Register the user and store their info in Firestore
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (user.password !== user.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // Register the user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, user.email, user.password);
      const { uid } = userCredential.user;

      // Upload the photo to Firebase Storage
      let photoURL = '';
      if (user.photo) {
        const photoRef = ref(storage, `admin_photos/${uid}`);
        await uploadBytes(photoRef, user.photo);
        photoURL = await getDownloadURL(photoRef);
      }

      // Store user data in Firestore 'admin' collection
      await setDoc(doc(db, 'admins', uid), {
        userName: user.userName,
        surname: user.surname,
        age: user.age,
        email: user.email,
        role: user.role, // role is 'System-admin'
        photoURL: photoURL, // Store the download URL of the uploaded photo
      });

      localStorage.setItem('adminId', uid);

      alert("Registration successful");
      
      // Clear form data after registration
      setUser({
        userName: '',
        surname: '',
        age: '',
        password: '',
        confirmPassword: '',
        email: '',
        role: 'System-admin',
        photo: null,
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
            
            {/* Name field */}
            <div>
              <input 
                type="text" 
                name="userName" 
                placeholder="Name" 
                value={user.userName} 
                onChange={handleChange} 
                required 
              />
            </div>
            
            {/* Surname field */}
            <div>
              <input 
                type="text" 
                name="surname" 
                placeholder="Surname" 
                value={user.surname} 
                onChange={handleChange} 
                required 
              />
            </div>
            
            {/* Age field */}
            <div>
              <input 
                type="number" 
                name="age" 
                placeholder="Age" 
                value={user.age} 
                onChange={handleChange} 
                required 
              />
            </div>
            
            {/* Photo field */}
            <div id="photo-field">
              <label htmlFor="photo-upload" className="photo-label">
                Upload Photo
              </label>
              <input 
                type="file" 
                id="photo-upload" 
                name="photo" 
                accept="image/*" 
                onChange={handleFileChange} 
                required 
              />
            </div>
            
            {/* Role field (read-only) */}
            <div>
              <input 
                type="text" 
                name="role" 
                value={user.role} 
                readOnly 
              />
            </div>

            {/* Password fields */}
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

            {/* Email field */}
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

            {/* Submit button */}
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
