import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { useAuth } from '../pages/auth/authprovider';
import { auth, db } from '../firebase/setup'; // Import Firebase auth and Firestore instances
import { Card, CardMedia, TextField, Button, Stack, Link } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GreenhouseBackground from './img/Greenhouse.png';
import logo from './img/Green.png';

const RegistrationForm = () => {
  const { userLoggedIn } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [deviceName, setDeviceName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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

      // Update user profile (optional)
      await updateProfile(user, { displayName: username });

      const userRef = collection(db, 'users');
      await addDoc(userRef, {
        uid: user.uid,
        username,
        email,
        deviceName,
      });

      showToast('User registered successfully!', 'success');
    } catch (error) {
      console.error('Registration error:', error);
      setError(error.message);
      showToast('Registration failed. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ backgroundImage: `url(${GreenhouseBackground})`, backgroundSize: 'cover', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {userLoggedIn && <Navigate to={'/login'} replace={true} />}
      <form onSubmit={handleRegister}>
        <Card sx={{ backgroundColor: '#FFFFFF', height: 'auto', width: '410px', padding: '20px', border: '2px solid #12372A', borderRadius: '8px' }}>
          <CardMedia component="img" image={logo} alt="Green" style={{ height: 60, width: 250, margin: '0 auto', marginBottom: 20 }} />
          <Stack spacing={2} sx={{ marginX: 'auto', width: '80%', textAlign: 'center' }}>
            <TextField variant="outlined" size="small" label="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
            <TextField variant="outlined" size="small" label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <TextField variant="outlined" size="small" label="Device Name" value={deviceName} onChange={(e) => setDeviceName(e.target.value)} required />
            <TextField variant="outlined" size="small" label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <TextField variant="outlined" size="small" label="Confirm Password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          </Stack>
          <Stack spacing={2} sx={{ marginX: 'auto', width: '80%', textAlign: 'center', marginTop: 2 }}>
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
