import React from 'react';

const PreviousEmployeeTable = ({ previousEmployees }) => {
  return (
    <div className="table-container">
      <h2>Previous Employees</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>ID</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Position</th>
            <th>Picture</th>
          </tr>
        </thead>
        <tbody>
          {previousEmployees.map((employee, index) => (
            <tr key={index}>
              <td>{employee.name}</td>
              <td>{employee.id}</td>
              <td>{employee.email}</td>
              <td>{employee.phone}</td>
              <td>{employee.position}</td>
              <td><img src={employee.picture} alt={employee.name} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PreviousEmployeeTable;