// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { EmployeeProvider } from './contexts/EmployeeContext';  // Correct path to EmployeeContext
import Loginpage from './Pages/Loginpage.jsx';
import RegisterPage from './Pages/RegisterPage.jsx';
import HomePage from './Pages/HomePage.jsx';
import FormPage from './Pages/FormPage.jsx';
import EmployeeForm from './Component/EmployeeForm';
import EmployeeManagement from './Component/EmployeeManagement';
import UpdatePage from './Pages/UpdatePage';
import Update from './Component/Update';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Loginpage/>,
    errorElement: <div>404 Not Found</div>,
  },
  {
    path: '/RegisterPage',
    element: <RegisterPage />,
  },
  {
    path: '/Home',
    element: <HomePage />,
  },
  {
    path: '/Form',
    element: <FormPage />,
  },
  {
    path: '/EmployeeForm',
    element: <EmployeeForm />,
  },
  {
    path: '/EmployeeManagement',
    element: <EmployeeManagement />,
  },{
    path: '/UpdateProfile',
    element:<Update/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <EmployeeProvider>
      <RouterProvider router={router} />
    </EmployeeProvider>
  </React.StrictMode>
);
