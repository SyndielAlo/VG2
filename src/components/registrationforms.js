import React, { useState } from 'react';
import {
  TextField,
  Button,
  CircularProgress,
  Alert,
} from '@mui/material';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { auth, db } from  '../firebase/setup';; // Import from firebase.js

const RegistrationForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [deviceName, setDeviceName] = useState('');
  const [picture, setPicture] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRegister = async (event) => {
    event.preventDefault(); // Prevent default form submission

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

      // Create user document in Firestore
      const userRef = collection(db, 'users');
      await addDoc(userRef, {
        uid: user.uid,
        username,
        email,
        deviceName,
        picture: picture ? await uploadPicture(picture) : null, // Upload picture if provided
      });

      console.log('User registered successfully!');
      // Handle successful registration (e.g., redirect to login or home page)
    } catch (error) {
      console.error('Registration error:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePictureChange = (event) => {
    setPicture(event.target.files[0]);
  };

  // Function to upload picture to storage (omitted for brevity)
  const uploadPicture = async (pictureFile) => {
    // Implement logic to upload picture to Firebase Storage or another provider
    // Return the uploaded picture's URL
  };

  return (
    <form onSubmit={handleRegister}>
      <TextField
        label="Username"
        variant="outlined"
        margin="normal"
        fullWidth
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        required
      />
      <TextField
        label="Email"
        variant="outlined"
        margin="normal"
        fullWidth
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required
      />
      <TextField
        label="Password"
        variant="outlined"
        margin="normal"
        fullWidth
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        required
      />
      <TextField
        label="Confirm Password"
        variant="outlined"
        margin="normal"
        fullWidth
        type="password"
        value={confirmPassword}
        onChange={(event) => setConfirmPassword(event.target.value)}
        required
      />
      <TextField
        label="Device Name"
        variant="outlined"
        margin="normal"
        fullWidth
        value={deviceName}
        onChange={(event) => setDeviceName(event.target.value)}
      />
      <input
        accept="image/*"
        id="contained-button-file"
        type="file"
        onChange={handlePictureChange}
        style={{ display: 'none' }}
      />
      <label htmlFor="contained-button-file">
        <Button variant="contained" component="span">
          Upload Picture
        </Button>
      </label>
      <Button type="submit" variant="contained" disabled={isLoading}>
        {isLoading ? <CircularProgress size="small" /> : 'Register'}
      </Button>
      {error && <Alert severity="error">{error}</Alert>}
    </form>
  );
};

export default RegistrationForm;
