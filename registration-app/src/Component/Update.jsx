import React, { useState } from 'react';
import '../Styles/Update.css';

const Update = ({ onUpdateAdmin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the new password and confirm password match
    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    // Perform the update
    onUpdateAdmin({ username, password });

    // Clear the form fields and message
    setUsername('');
    setPassword('');
    setConfirmPassword('');
    setMessage('Admin details updated successfully.');
  };

  return (
    <div className="update-form-container">
      <form className="update-form" onSubmit={handleSubmit}>
        <h2>Update Admin Details</h2>
        <input
          type="text"
          placeholder="New Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Update</button>
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
};

export default Update;
