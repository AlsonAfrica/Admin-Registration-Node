// src/contexts/EmployeeContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the context
const EmployeeContext = createContext();

// Custom hook to use the EmployeeContext
export const useEmployeeContext = () => useContext(EmployeeContext);

// Provider component
export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [previousEmployees, setPreviousEmployees] = useState([]);

  useEffect(() => {
    const storedEmployees = JSON.parse(localStorage.getItem('employees')) || [];
    setEmployees(storedEmployees);
  }, []);

  useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(employees));
  }, [employees]);

  return (
    <EmployeeContext.Provider value={{ employees, setEmployees, previousEmployees, setPreviousEmployees }}>
      {children}
    </EmployeeContext.Provider>
  );
};
