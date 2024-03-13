import React, { useState } from 'react';
import { Navigate} from 'react-router-dom'
import { useAuth } from '../pages/auth/authprovider';
import { doSignInWithEmailAndPassword, doSignInWithGoogle } from '../firebase/auth';
import { Card, CardMedia, TextField, Button, Stack, Link } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GoogleIcon from '@mui/icons-material/Google';
import logo from './img/Green.png';
import GreenhouseBackground from './img/Greenhouse.png';

const LoginForm = () => {
  const { userLoggedIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);

  const showToast = (message, type) => {
    toast[type](message, {
      position: 'top-right',
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      onClick: closeToast => closeToast(), // Close the toast when clicked
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      try {
        await doSignInWithEmailAndPassword(email, password);
        showToast('Login successful!', 'success');
      } catch (error) {
        showToast('Login failed. Please check your credentials and try again.', 'error');
      } finally {
        setIsSigningIn(false);
      }
    }
  };

  const onGoogleSignIn = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      try {
        await doSignInWithGoogle();
        showToast('Login with Google successful!', 'success');
      } catch (error) {
        showToast('Login with Google failed. Please try again.', 'error');
      } finally {
        setIsSigningIn(false);
      }
    }
  };

  return (
    <div style={{ backgroundImage: `url(${GreenhouseBackground})`, backgroundSize: 'cover', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
         {userLoggedIn && (<Navigate to={'/home'} replace={true} />)}
      <form onSubmit={onSubmit}>
        <Card sx={{ backgroundColor: '#FFFFFF', height: '410px', width: '410px', padding: '20px', border: '2px solid #12372A', borderRadius: '8px' }}>
          <CardMedia component="img" image={logo} alt="Green" style={{ height: 60, width: 250, margin: '0 auto', marginBottom: 20 }} />
          
          <Stack spacing={2} sx={{ marginX: 'auto', width: '80%', textAlign: 'center' }}>
            <TextField variant="outlined" size="small" label="Username" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <TextField variant="outlined" size="small" label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </Stack>

            <Stack spacing={2} sx={{ marginX: 'auto', width: '80%', textAlign: 'center', marginTop: 2 }}>
            <Button variant="contained" type="submit" sx={{ width:  '100%', height: '40px', fontSize: '14px' }}>Submit</Button>
            <div onClick={onGoogleSignIn} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', marginTop: '10px', width: '95%', height: '30px', fontSize: '14px', color: 'white', backgroundColor: 'red' }}>
            <GoogleIcon />
            <span>Continue with Google</span>
            </div>
            </Stack>  
            
            <Stack spacing={3} sx={{ textAlign: 'center', marginTop: 2 }}>
                <Link href="/register" variant="body2" sx={{ fontSize: '12px', color: 'blue' }}>Don't have an account?</Link>
            </Stack>
        </Card>
      </form>
      <ToastContainer />
    </div>
  );
};

export default LoginForm;
