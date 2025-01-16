import React, { useState, useEffect } from 'react';
import { useEmployeeContext } from '../contexts/EmployeeContext';
import '../Styles/EmployeeManagement.css';
import EditAdminsForm from './EditAdminsForm';
import axios from 'axios';

const AdminTable = () => {
  const { employees, setEmployees, previousEmployees, setPreviousEmployees } = useEmployeeContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [miniAdmins, setMiniAdmins] = useState([]); 
  
  // Load employees from Firestore
  useEffect(() => {
    const fetchMiniAdmins = async () => {
        try {
            const response = await axios.get('http://localhost:5001/mini-admins'); 
            setMiniAdmins(response.data); 
            console.log('Mini Admins:', response.data); 
        } catch (error) {
            console.error('Error fetching mini-admins:', error); 
        }
    };

    fetchMiniAdmins();
}, []);

  // Save previous employees to localStorage whenever `previousEmployees` changes
  useEffect(() => {
    if (previousEmployees.length > 0) {
      try {
        localStorage.setItem('previousEmployees', JSON.stringify(previousEmployees));
      } catch (error) {
        console.error('Error saving previous employees to localStorage:', error);
      }
    }
  }, [previousEmployees]);


  // Delete admin

const deleteMiniAdmin = async (userId)=>{

  try {
    const response = await axios.delete(`http://localhost:5001/mini-admins/${userId}`);

    console.log("User deleted:", response.data);
    alert("Admin deleted successfully")
  } catch (error) {
    console.error('Error deleting user:', error);
    alert('Error deleting user');
  }
}

  const handleEdit = (admin) => {
    setEditingAdmin(admin);
  };

  const handleSave = (updatedAdmin) => {
    const updatedEmployees = employees.map((admin) =>
      admin.id === updatedAdmin.id ? updatedAdmin :admin
    );
    setEmployees(updatedEmployees);
    setEditingAdmin(null);
  };

  const handleCancel = () => {
    setEditingAdmin(null);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredEmployees = miniAdmins.filter((admin) =>
  admin.idNumber.toLowerCase().includes(searchQuery.toLowerCase())
);


  return (
    <div className="employee-management">
      <h1>Admins</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by ID Number"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      {editingAdmin ? (
        <EditAdminsForm
          AdminToEdit={editingAdmin}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      ) : (
        <div className="tables-container">
          <div className="table-container">
            <h2>Current Admins</h2>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>ID Number</th> {/* Changed from ID to ID Number */}
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th>Position</th>
                  <th>Picture</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((admin) => (
                  <tr key={admin.id}>
                    <td>{admin.name}</td>
                    <td>{admin.idNumber}</td> {/* Display the idNumber here */}
                    <td>{admin.email}</td>
                    <td>{admin.phoneNumber}</td>
                    <td>{admin.position}</td>
                    <td>
                      <img src={admin.image} alt={admin.name} />
                    </td>
                    <td className="actions">
                      <button className="edit-btn" onClick={() => handleEdit(admin)}>
                        Edit
                      </button>
                      <button className="delete-btn" onClick={() => deleteMiniAdmin(admin.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="table-container">
            <h2>Previous Admins</h2>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>ID Number</th> {/* Changed from ID to ID Number */}
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th>Position</th>
                  <th>Picture</th>
                </tr>
              </thead>
              <tbody>
                {previousEmployees.map((admin) => (
                  <tr key={admin.id}>
                    <td>{admin.name}</td>
                    <td>{admin.idNumber}</td> {/* Display the idNumber here */}
                    <td>{admin.email}</td>
                    <td>{admin.phone}</td>
                    <td>{admin.position}</td>
                    <td>
                      <img src={admin.picture} alt={admin.name} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTable;
