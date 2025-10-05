import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

// This is a sample component. You'll need to adapt it to your project structure.
// I'm assuming you have components for your form and for displaying passwords.

const PasswordForm = ({ selectedPassword, fetchPasswords }) => {
  const [title, setTitle] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (selectedPassword) {
      setTitle(selectedPassword.title);
      setUsername(selectedPassword.username);
      setPassword(selectedPassword.password);
    } else {
      setTitle('');
      setUsername('');
      setPassword('');
    }
  }, [selectedPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); // Assuming you store the token in localStorage
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      if (selectedPassword) {
        // Update existing password
        await axios.put(`/api/v1/password/update-password/${selectedPassword._id}`, { title, username, password }, config);
        toast.success('Password updated successfully!');
      } else {
        // Add new password
        await axios.post('/api/v1/password/post-password', { title, username, password }, config);
        toast.success('Password saved successfully!');
      }
      fetchPasswords(); // Refresh the list
      setTitle('');
      setUsername('');
      setPassword('');
    } catch (error) {
      console.error('Error saving password:', error);
      toast.error(error.response?.data?.message || 'Failed to save password.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
        {selectedPassword ? 'Update Password' : 'Save Password'}
      </button>
    </form>
  );
};

const HomePage = () => {
  const [passwords, setPasswords] = useState([]);
  const [selectedPassword, setSelectedPassword] = useState(null);

  const fetchPasswords = async () => {
     const token = localStorage.getItem('token');
     const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get('/api/v1/password/get-password', config);
    setPasswords(data.data);
  };

  useEffect(() => {
    fetchPasswords();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Password Manager</h1>
      <PasswordForm selectedPassword={selectedPassword} fetchPasswords={fetchPasswords} />
      {/* You would render your list of passwords here and handle selection */}
    </div>
  );
};

export default HomePage;