import { auth } from '../../configs/firebase' // Import Firebase auth instance from firebase.js
import { login, logout } from 'store/auth'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"

// Register function
const asyncRegister = ({ firstName, lastName, email, password }) => async (dispatch) => {
  try {
    // Create user with Firebase
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Dispatch login with Firebase user data
    dispatch(login({ user: { id: user.uid, email: user.email, firstName, lastName }, token: user.accessToken }));
    alert("Registration Successful")
  } catch (error) {
    console.error("Registration Error:", error.message);
    alert('Registration failed. Please try again.')
    // Handle registration error if needed
  }
};

// Login function
const asyncLogin = ({ email, password }) => async (dispatch) => {
  try {
    // Sign in with Firebase
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Dispatch login with Firebase user data
    dispatch(login({ user: { id: user.uid, email: user.email }, token: user.accessToken }));
    alert("Login Successful")
  } catch (error) {
    console.error("Login Error:", error.message);
    alert('Invalid username or password. Please try again.')
    // Handle login error if needed
  }
};

// Logout function
const asyncLogout = () => async (dispatch) => {
  try {
    // Sign out with Firebase
    await signOut(auth);
    dispatch(logout());
    alert("Logout Successful")
  } catch (error) {
    console.error("Logout Error:", error.message);
    // Handle logout error if needed
  }
};

export { asyncRegister, asyncLogin, asyncLogout };
