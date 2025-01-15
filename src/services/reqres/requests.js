
import { useState } from 'react';

import { auth } from '../../configs/firebase' // Import Firebase auth instance from firebase.js
import { login, logout } from 'store/auth'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { toast } from 'react-toastify';

const Notification = {
  open: false,
  message: '',
  severity: 'info', // "info", "success", "warning", "error"
}


// Register function
const asyncRegister = ({ firstName, lastName, email, password }) => async (dispatch) => {

  try {
    // Create user with Firebase
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
   
    // Dispatch login with Firebase user data
    dispatch(login({ user: { id: user.uid, email: user.email, firstName, lastName }, token: user.accessToken }));
    Notification.open = true;
    Notification.message = 'Registration successful.';
    Notification.severity = 'success';

  } catch (error) {
    console.error("Registration Error:", error.message);
    Notification.open = true;
    Notification.message = 'Registration failed. Please try again.';
    Notification.severity = 'error';
  }
};

// Login function
const asyncLogin = ({ email, password }) => async (dispatch) => {
  try {
    // Sign in with Firebase
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
   Notification.open = true;
   Notification.message = 'Login successful.';
   Notification.severity = 'success';


    // Dispatch login with Firebase user data
    dispatch(login({ user: { id: user.uid, email: user.email }, token: user.accessToken }));   

  } catch (error) {


    // console.error("Login Error:", error.message);   
    // Notification.open = true;
    // Notification.message = 'Login failed. Please try again.';
    // Notification.severity = 'error';
    // Handle login error if needed
  } 
};

// Logout function
const asyncLogout = () => async (dispatch) => {
  Notification.open = true;
  Notification.message = 'Logout successful.';
  Notification.severity = 'success';
  try {
    await signOut(auth);
    dispatch(logout());

    toast.success('Logout successful.');
  } catch (error) {
    console.error("Logout Error:", error.message);
  } 
};

const handleCloseNotification = () => {
  console.log('Notification closed');

  // Notification.open = false;
};


export {handleCloseNotification,Notification, asyncRegister, asyncLogin, asyncLogout };
