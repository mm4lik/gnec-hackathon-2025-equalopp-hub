import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';

// Inline country list
const countries = [
  "Afghanistan", "Albania", "Algeria", "Argentina", "Australia", "Austria", "Bangladesh",
  "Belgium", "Brazil", "Canada", "China", "Denmark", "Egypt", "Finland", "France", "Germany",
  "Greece", "India", "Indonesia", "Ireland", "Italy", "Japan", "Kenya", "Malaysia", "Mexico",
  "Netherlands", "New Zealand", "Nigeria", "Norway", "Pakistan", "Philippines", "Poland",
  "Portugal", "Russia", "Saudi Arabia", "Singapore", "South Africa", "South Korea", "Spain",
  "Sri Lanka", "Sweden", "Switzerland", "Thailand", "Turkey", "Ukraine", "UAE", "UK", "USA",
  "Vietnam", "Zimbabwe"
];

function Login() {
  const { setUser } = useContext(UserContext);
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    gender: '',
    country: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = mode === 'login' ? 'login' : 'register';
    const url = `http://localhost:3000/${endpoint}`;

    const body = mode === 'login'
      ? { email: form.email, password: form.password }
      : form;

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (res.ok && data.access_token) {
        localStorage.setItem('token', data.access_token);
        const token = data.access_token;
        try {
          const nameRes = await fetch('http://localhost:3000/get-name', {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` },
          });

          if (nameRes.ok) {
            const nameData = await nameRes.json();
            setUser({ name: nameData.name, isLoggedIn: true }); // Update context with name
            alert('Logged in!');
            window.location = '/dashboard';
          } else {
            localStorage.removeItem('token'); // Remove invalid token
            alert('Session expired. Please log in again.');
          }
        } catch (err) {
          console.error('Error fetching name:', err);
          localStorage.removeItem('token'); // Remove invalid token
          alert('Failed to verify session. Please log in again.');
        }
      } else if (res.ok && mode === 'register') {
        alert('Registration successful! You can now log in.');
        setMode('login');
      } else {
        alert(data.message || 'Something went wrong');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to connect to server');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">{mode === 'login' ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        {mode === 'register' && (
          <>
            <input
              name="name"
              placeholder="Name"
              className="border p-2 w-full"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              name="gender"
              placeholder="Gender"
              className="border p-2 w-full"
              value={form.gender}
              onChange={handleChange}
              required
            />
            <select
              name="country"
              className="border p-2 w-full"
              value={form.country}
              onChange={handleChange}
              required
            >
              <option value="">Select your country</option>
              {countries.map((country) => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </>
        )}
        <input
          name="email"
          placeholder="Email"
          type="email"
          className="border p-2 w-full"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          placeholder="Password"
          type="password"
          className="border p-2 w-full"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button className="bg-blue-500 text-white p-2 w-full">
          {mode === 'login' ? 'Login' : 'Register'}
        </button>
      </form>
      <button
        className="mt-2 text-sm text-blue-500"
        onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
      >
        Switch to {mode === 'login' ? 'Register' : 'Login'}
      </button>
    </div>
  );
}

export default Login;