import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { doc, updateDoc } from 'firebase/firestore';
import { db, auth } from '../configs/firebase';
import CardContainer from 'components/ui-elements/CardContainer';
import { LockOutlined, AccountCircleOutlined } from '@mui/icons-material';
import { toast, ToastContainer } from 'react-toastify';

function Settings() {
  const dispatch = useDispatch();
  const user = useSelector((state) =>
    state.user?.data?.find((u) => u.id === auth.currentUser?.uid) || null
  );

  const [username, setUsername] = useState(user?.username || '');
  const [password, setPassword] = useState('');


  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      if (username !== user.username) {
        const userRef = doc(db, 'users', auth.currentUser.uid);
        await updateDoc(userRef, { username });
      }

      if (password) {
        await auth.currentUser.updatePassword(password);
      }
      toast.success('Settings updated successfully.');
      } catch (error) {
      console.error('Error updating settings:', error);
      toast.error('Error updating settings. Please try again.');
    }
  };

  return (
    <CardContainer className="bg-white shadow-lg p-6 rounded-lg">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">Settings</h1>
      <form onSubmit={handleUpdate} className="space-y-4">
        {/* Username Field */}
        <div className="flex items-center space-x-2">
          <AccountCircleOutlined className="text-gray-500" />
          <div className="flex-1">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="flex items-center space-x-2">
          <LockOutlined className="text-gray-500" />
          <div className="flex-1">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Update Settings
          </button>
        </div>
      </form>
    </CardContainer>
  );
}

export default Settings;
