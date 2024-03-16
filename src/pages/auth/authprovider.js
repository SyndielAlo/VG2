import React, { useContext, useState, useEffect } from "react";
import { auth, db } from "../../firebase/setup";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [isEmailUser, setIsEmailUser] = useState(false);
  const [isGoogleUser, setIsGoogleUser] = useState(false);
  const [loading, setLoading] = useState(true);
  const [redirecting, setRedirecting] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);
    return unsubscribe;
  }, []);

  async function initializeUser(user) {
    if (user) {
      setCurrentUser({ ...user });

      const isEmail = user.providerData.some(
        (provider) => provider.providerId === "password"
      );
      setIsEmailUser(isEmail);

      try {
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnapshot = await getDoc(userDocRef);
        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          setCurrentUser((prevUser) => ({
            ...prevUser,
            userData,
          }));
        }
      } catch (error) {
        console.error("Error fetching user data from Firestore:", error);
      }

      setUserLoggedIn(true);
    } else {
      setCurrentUser(null);
      setUserLoggedIn(false);
    }

    setLoading(false);
    setRedirecting(false);
  }

  useEffect(() => {
    // Redirect to login if user is not logged in and tries to access pages other than "/", "/login", or "/register"
    if (!loading && !userLoggedIn && !["/", "/login", "/register"].includes(window.location.pathname)) {
      navigate("/login");
    }
  }, [loading, userLoggedIn, navigate]);

  if (redirecting) {
    return <LoadingSpinner />;
  }

  return (
    <AuthContext.Provider
      value={{
        userLoggedIn,
        isEmailUser,
        isGoogleUser,
        currentUser,
        setCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
function LoadingSpinner() {
  return (
    <div className="loading-spinner">
      <CircularProgress />
      <p>Loading...</p>
    </div>
  );
}