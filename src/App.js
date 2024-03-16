import React from 'react';
import {  Route, Routes } from 'react-router-dom';
import { AuthProvider } from './pages/auth/authprovider';
import Index_Home from './pages/home/home';
import LoginPage from './pages/login/loginpage';
import RegisterPage from './pages/registration/registrationpage';
import DashboardPage from './pages/dasboard/dasboard';
import PlantPage from './pages/plantmonitor/PlantPages';
import SettingsPage from './pages/settings/settingspage';


function App() {
  return (
    <AuthProvider>
      
        <Routes>
          <Route path="*" element={<Index_Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/home" element={DashboardPage} />
          <Route path="/plant" element={<PlantPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      
    </AuthProvider>
  );
}

export default App;
