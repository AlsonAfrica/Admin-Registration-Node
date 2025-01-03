import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const ProfilePage = () => {
  const [profile, setProfile] = useState(null); // State to store admin profile
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    const fetchAdminProfile = async () => {
        try {
            const adminId = localStorage.getItem('adminId');
            if (!adminId) {
                setError('Admin ID not available. Please log in again.');
                setLoading(false);
                return;
            }
            const response = await axios.get(`http://localhost:5001/admins/${adminId}`);
            setProfile(response.data);
            console.log(profile)
            setLoading(false);
        } catch (err) {
            console.error('Error fetching admin profile:', err);
            setError('Failed to load profile.');
            setLoading(false);
        }
    };

    fetchAdminProfile();
}, []);


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!profile) {
    return <div>No profile data available.</div>;
  }

  return (
    <div>
      <Navbar />
      <div
        style={{
          minHeight: '100vh',
          padding: '2rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <div
          style={{
            backgroundColor: 'white',
            borderRadius: '10px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            padding: '2rem',
            width: '100%',
            maxWidth: '600px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {/* Profile Image */}
            <div
              style={{
                width: '150px',
                height: '150px',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '4px solid #e1e4e8',
                marginBottom: '1.5rem',
              }}
            >
              <img
                src={profile.photoURL || '/api/placeholder/150/150'} // Fallback to placeholder if no photoUrl
                alt="Profile"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </div>

            {/* Name */}
            <div style={{display:"flex", flexDirection:"row", gap:10}}>
                <h2
                style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: '#2d3748',
                  marginBottom: '1.5rem',
                  textAlign: 'center',
                }}
              >
                {profile.userName}
              </h2>

                <h2
                style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: '#2d3748',
                  marginBottom: '1.5rem',
                  textAlign: 'center',
                }}
              >
                {profile.surname}
              </h2>

            </div>
            
            {/* Profile Details */}
            <div
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              {/* Age */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '0.75rem',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '8px',
                }}
              >
                <span style={{ color: '#4a5568', fontWeight: '500' }}>Age</span>
                <span style={{ color: '#2d3748' }}>{profile.age}</span>
              </div>

              {/* email */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '0.75rem',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '8px',
                }}
              >
                <span style={{ color: '#4a5568', fontWeight: '500' }}>Email</span>
                <span style={{ color: '#2d3748' }}>{profile.email}</span>
              </div>

              {/* Role */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '0.75rem',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '8px',
                }}
              >
                <span style={{ color: '#4a5568', fontWeight: '500' }}>Role</span>
                <span style={{ color: '#2d3748' }}>{profile.role}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
