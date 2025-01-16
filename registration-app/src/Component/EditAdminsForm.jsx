import React, { useState, useEffect } from 'react';
import { useEmployeeContext } from '../contexts/EmployeeContext';
import '../Styles/EmployeeForm.css';
import axios from 'axios';

const EditAdminsForm = ({ AdminToEdit, onSave, onCancel }) => {
  const { employees, setEmployees } = useEmployeeContext();
  const [name, setName] = useState(AdminToEdit.name || '');
  const [id] = useState(AdminToEdit.id); 
  const [email, setEmail] = useState(AdminToEdit.email || '');
  const [phoneNumber, setPhoneNumber] = useState(AdminToEdit.phoneNumber || '');
  const [position, setPosition] = useState(AdminToEdit.position || '');
  const [image, setImage] = useState(AdminToEdit.image || '');
  const [idNumber, setIdNumber] = useState(AdminToEdit.idNumber || '');
  const [password, setPassword] = useState(AdminToEdit.password || '');
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const updatedAdmin = {
      name,
      email,
      phoneNumber,
      position,
      image,
      idNumber,
      password,
    };

    try {
      const response = await axios.put(`http://localhost:5001/editmini-admins/${id}`, updatedAdmin);
      console.log(response.data.message);
      onSave(response.data); // Notify parent of success
      const updatedEmployees = employees.map((emp) =>
        emp.id === id ? { ...emp, ...updatedAdmin } : emp
      );
      setEmployees(updatedEmployees); // Update context state
    } catch (error) {
      console.error('Error updating admin:', error.response?.data || error.message);
      setError('Failed to update admin. Please try again.');
    }
  };

  useEffect(() => {
    setName(AdminToEdit.name || '');
    setEmail(AdminToEdit.email || '');
    setPhoneNumber(AdminToEdit.phoneNumber || '');
    setPosition(AdminToEdit.position || '');
    setImage(AdminToEdit.image || '');
    setIdNumber(AdminToEdit.idNumber || '');
    setPassword(AdminToEdit.password || '');
  }, [AdminToEdit]);

  return (
    <form className="employee-form" onSubmit={handleSubmit}>
      <h2 className="Edit-Employee">EDIT ADMIN</h2>
      {error && <p className="error-message">{error}</p>}
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input type="text" placeholder="ID" value={id} readOnly />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Position"
        value={position}
        onChange={(e) => setPosition(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="ID Number"
        value={idNumber}
        onChange={(e) => setIdNumber(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <input type="file" className="Upload-img" onChange={handleFileChange} />
      <button type="submit" className="Save-btn">
        Save Changes
      </button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default EditAdminsForm;
