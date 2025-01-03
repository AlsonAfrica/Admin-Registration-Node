import React from 'react';
import Navbar from './Navbar';

const ProfilePage = () => {
  // Sample profile data
  const profile = {
    name: "John Smith",
    age: 32,
    idNumber: "EMP2024-001",
    role: "Senior Software Engineer",
    photoUrl: "/api/placeholder/150/150"  // Using placeholder image
  };

  return (
    <div>
    <Navbar/>
    <div style={{
      minHeight: '100vh',
    //   backgroundColor: '#f0f2f5',
      padding: '2rem',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        padding: '2rem',
        width: '100%',
        maxWidth: '600px'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          {/* Profile Image */}
          <div style={{
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '4px solid #e1e4e8',
            marginBottom: '1.5rem'
          }}>
            <img 
              src={profile.photoUrl} 
              alt="Profile"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </div>

          {/* Name */}
          <h2 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#2d3748',
            marginBottom: '1.5rem',
            textAlign: 'center'
          }}>
            {profile.name}
          </h2>

          {/* Profile Details */}
          <div style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            {/* Age */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '0.75rem',
              backgroundColor: '#f8f9fa',
              borderRadius: '8px'
            }}>
              <span style={{ color: '#4a5568', fontWeight: '500' }}>Age</span>
              <span style={{ color: '#2d3748' }}>{profile.age}</span>
            </div>

            {/* ID Number */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '0.75rem',
              backgroundColor: '#f8f9fa',
              borderRadius: '8px'
            }}>
              <span style={{ color: '#4a5568', fontWeight: '500' }}>ID Number</span>
              <span style={{ color: '#2d3748' }}>{profile.idNumber}</span>
            </div>

            {/* Role */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '0.75rem',
              backgroundColor: '#f8f9fa',
              borderRadius: '8px'
            }}>
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