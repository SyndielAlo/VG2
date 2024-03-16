import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { createUserWithEmailAndPassword} from 'firebase/auth';
import { collection, addDoc} from 'firebase/firestore'; // Import getFirestore
import { useAuth } from '../pages/auth/authprovider';
import { auth, db } from '../firebase/setup';
import { Card, CardMedia, TextField, Button, Stack, Link } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GreenhouseBackground from './img/Greenhouse.png';
import logo from './img/Green.png';

const RegistrationForm = () => {
  const { userLoggedIn } = useAuth();
  const navigate = useNavigate(); 
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [deviceName, setDeviceName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setUsername('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setDeviceName('');
    setError(null);
  }, []);

  const showToast = (message, type) => {
    toast[type](message, {
      position: 'top-right',
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const handleRegister = async (event) => {
    event.preventDefault();
  
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
  
    setIsLoading(true);
    setError(null);
  
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Add document to the collection with auto-generated ID
      await addDoc(collection(db, 'users'), {
        username,
        email,
        deviceName,
        picture:"",
      });
  
      showToast('User registered successfully!', 'success');
  
      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setDeviceName('');
  
      navigate('/login'); // Redirect to the login page after successful registration
    } catch (error) {
      console.error('Registration error:', error);
      setError(error.message);
      showToast('Registration failed. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      backgroundImage: `url(${GreenhouseBackground})`,
      backgroundSize: 'cover',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '0 20px', // Add padding for smaller screens
    }}>
      <form onSubmit={handleRegister} style={{ width: '100%', maxWidth: '500px' }}> {/* Limit the form width */}
        <Card sx={{
          backgroundColor: '#FFFFFF',
          height: 'auto',
          width: '100%', // Make the card take full width of the container
          padding: '20px',
          border: '2px solid #12372A',
          borderRadius: '8px',
        }}>
          <CardMedia component="img" image={logo} alt="Green" style={{ height: 'auto', width: '100%', maxWidth: '250px', margin: '0 auto', marginBottom: '20px' }} /> {/* Make the logo responsive */}
          <Stack spacing={2} sx={{ textAlign: 'center' }}>
           <TextField 
  variant="outlined" 
  size="small" 
  label="Username" 
  value={username} 
  onChange={(e) => {
    setUsername(e.target.value);
    console.log("Username:", e.target.value);
  }} 
  required 
  fullWidth 
/>

<TextField 
  variant="outlined" 
  size="small" 
  label="Email" 
  type="email" 
  value={email} 
  onChange={(e) => {
    setEmail(e.target.value);
    console.log("Email:", e.target.value);
  }} 
  required 
  fullWidth 
/>

<TextField 
  variant="outlined" 
  size="small" 
  label="Device Name" 
  value={deviceName} 
  onChange={(e) => {
    setDeviceName(e.target.value);
    console.log("Device Name:", e.target.value);
  }} 
  required 
  fullWidth 
/>

<TextField 
  variant="outlined" 
  size="small" 
  label="Password" 
  type="password" 
  value={password} 
  onChange={(e) => {
    setPassword(e.target.value);
    console.log("Password:", e.target.value);
  }} 
  required 
  fullWidth 
/>

<TextField 
  variant="outlined" 
  size="small" 
  label="Confirm Password" 
  type="password" 
  value={confirmPassword} 
  onChange={(e) => {
    setConfirmPassword(e.target.value);
    console.log("Confirm Password:", e.target.value);
  }} 
  required 
  fullWidth 
/>
          </Stack>
          <Stack spacing={2} sx={{ textAlign: 'center', marginTop: 2 }}>
            <Button variant="contained" type="submit" sx={{ width: '100%', height: '40px', fontSize: '14px' }}>Register</Button>
          </Stack>
          <Stack spacing={3} sx={{ textAlign: 'center', marginTop: 2 }}>
            <Link href="/login" variant="body2" sx={{ fontSize: '12px', color: 'blue' }}>Already have an account? Login here</Link>
          </Stack>
        </Card>
      </form>
      <ToastContainer />
    </div>
  );
};

export default RegistrationForm;
