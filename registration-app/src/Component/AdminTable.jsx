import React, { useState, useEffect } from 'react';
import { useEmployeeContext } from '../contexts/EmployeeContext';
import '../Styles/EmployeeManagement.css';
import EditEmployeeForm from './EditEmployeeForm';
import axios from 'axios';

const AdminTable = () => {
  const { employees, setEmployees, previousEmployees, setPreviousEmployees } = useEmployeeContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [miniAdmins, setMiniAdmins] = useState([]); // State to store the fetched data
  
  // Load employees from Firestore
  useEffect(() => {
    const fetchMiniAdmins = async () => {
        try {
            const response = await axios.get('http://localhost:5001/mini-admins'); // Replace with your actual backend URL
            setMiniAdmins(response.data); // Store the fetched data in state
            console.log('Mini Admins:', response.data); // Log the data
        } catch (error) {
            console.error('Error fetching mini-admins:', error); // Log the error
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

  const handleDelete = (id) => {
    const employeeToDelete = employees.find((employee) => employee.id === id);
    if (employeeToDelete) {
      const updatedEmployees = employees.filter((employee) => employee.id !== id);
      const updatedPreviousEmployees = [...previousEmployees, employeeToDelete];

      setEmployees(updatedEmployees);
      setPreviousEmployees(updatedPreviousEmployees);
    }
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
  };

  const handleSave = (updatedEmployee) => {
    const updatedEmployees = employees.map((employee) =>
      employee.id === updatedEmployee.id ? updatedEmployee : employee
    );
    setEmployees(updatedEmployees);
    setEditingEmployee(null);
  };

  const handleCancel = () => {
    setEditingEmployee(null);
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
      {editingEmployee ? (
        <EditEmployeeForm
          employeeToEdit={editingEmployee}
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
                      <button className="edit-btn" onClick={() => handleEdit(employee)}>
                        Edit
                      </button>
                      <button className="delete-btn" onClick={() => handleDelete(employee.id)}>
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
                {previousEmployees.map((employee) => (
                  <tr key={employee.id}>
                    <td>{employee.name}</td>
                    <td>{employee.idNumber}</td> {/* Display the idNumber here */}
                    <td>{employee.email}</td>
                    <td>{employee.phone}</td>
                    <td>{employee.position}</td>
                    <td>
                      <img src={employee.picture} alt={employee.name} />
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
