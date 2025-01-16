import React, { useState } from 'react';
import { useEmployeeContext } from '../contexts/EmployeeContext';
import '../Styles/EmployeeForm.css';
import { IoMdPersonAdd } from "react-icons/io";
import axios from 'axios'; // Import Axios


const FormAdmin = () => {
  const { setEmployees } = useEmployeeContext();
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [position, setPosition] = useState('');
  const [picture, setPicture] = useState('');
  const [password,setPassword]= useState('')
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setPicture(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate ID and phone number
    if (!/^\d{13}$/.test(id)) {
      alert('ID must be exactly 13 digits.');
      return;
    }

    if (!/^0\d{9}$/.test(phone)) {
      alert('Phone number must be exactly 10 digits starting with 0.');
      return;
    }

    // Format phone number for Thailand (66 is Thailand's country code)
    // Remove the leading 0 and add +66
    const formattedPhone = `+66${phone.substring(1)}`;

    setIsLoading(true);

    const newEmployee = {
      name,
      email,
      phoneNumber: formattedPhone, // This will now be in format: +66XXXXXXXXX
      position,
      image: picture || 'https://via.placeholder.com/150',
      idNumber: id,
      password: 'defaultPassword123',
    };

    try {
      const response = await axios.post('http://localhost:5001/mini-admins', newEmployee, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setEmployees((prevEmployees) => {
        const updatedEmployees = [...prevEmployees, response.data];
        localStorage.setItem('employees', JSON.stringify(updatedEmployees));
        return updatedEmployees;
      });

      // Clear form fields
      setName('');
      setId('');
      setEmail('');
      setPhone('');
      setPosition('');
      setPicture('');

      setIsSuccess(true);
    } catch (error) {
      console.error('Error adding employee:', error.response?.data || error.message);
      alert('Failed to add employee. Error: ' + (error.response?.data?.message || error.message));
    } finally {
      setIsLoading(false);
    }
};

  return (
    <form className="employee-form" onSubmit={handleSubmit}>
      <h2>ADD NEW ADMINS</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
        required
      />
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
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
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
        className="Image-input"
        type="file"
        onChange={handleFileChange}
        required
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Adding...' : 'Add Employee'}
      </button>

      {isSuccess && <p className="success-message">Employee added successfully!</p>}
    </form>
  );
};

export default FormAdmin;
