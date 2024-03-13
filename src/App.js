import React from 'react';
import { BrowserRouter,useRoutes, Route, Navigate } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { AuthProvider } from './pages/auth/authprovider';

import Index_Homendex from './pages/home/home';
import LoginPage from './pages/login/loginpage';
import RegisterPage from './pages/registration/registrationpage';
import DashboardPage from './pages/dasboard/dasboard';
import PlantPage from './pages/plantmonitor/PlantPages';
import SettingsPage from './pages/settings/settingspage';
import UsernameComponent from './components/username';
// Import Firebase configuration from setup.js
import { auth, googleProvider, db } from './firebase/setup';;


function App() {
  const routesArray = [
    {
      path: "*",
      element: <Index_Homendex />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
    {
      path: "/Home",
      element: <DashboardPage />,
    },
    {
      path: "/PlantPage",
      element: <PlantPage />,
    },
    {
      path: "/SettingsPage",
      element: <SettingsPage/>,
    },

  ];
  let routesElement = useRoutes(routesArray);
  return (
    <AuthProvider>
      <div className="w-full h-screen flex flex-col">{routesElement}</div>
    </AuthProvider>
  );
}

export default App;