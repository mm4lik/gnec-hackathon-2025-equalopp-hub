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
            setUser({ name: nameData.name, isLoggedIn: true });
            alert('Logged in!');
            window.location = '/dashboard';
          } else {
            localStorage.removeItem('token');
            alert('Session expired. Please log in again.');
          }
        } catch (err) {
          console.error('Error fetching name:', err);
          localStorage.removeItem('token');
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-teal-50 to-green-50 px-4 py-12">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 border border-gray-100 transform transition-all hover:shadow-xl duration-300">

        {/* Mode Toggle */}
        <div className="flex justify-center space-x-4 mb-6">
          <button
            onClick={() => setMode('login')}
            className={`px-4 py-2 font-medium text-sm ${
              mode === 'login'
                ? 'text-teal-600 border-b-2 border-teal-500'
                : 'text-gray-500 hover:text-teal-500'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setMode('register')}
            className={`px-4 py-2 font-medium text-sm ${
              mode === 'register'
                ? 'text-teal-600 border-b-2 border-teal-500'
                : 'text-gray-500 hover:text-teal-500'
            }`}
          >
            Register
          </button>
        </div>

        {/* Form Title */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          {mode === 'login' ? 'Welcome Back!' : 'Create an Account'}
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <>
              <div>
                <input
                  name="name"
                  placeholder="Full Name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <input
                  name="gender"
                  placeholder="Gender"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                  value={form.gender}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <select
                  name="country"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 appearance-none bg-white"
                  value={form.country}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select your country</option>
                  {countries.map((country) => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>
            </>
          )}

          <div>
            <input
              name="email"
              placeholder="Email"
              type="email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <input
              name="password"
              placeholder="Password"
              type="password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white font-semibold rounded-lg shadow-md hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            {mode === 'login' ? 'Log In' : 'Register'}
          </button>
        </form>

        {/* Toggle Link */}
        <div className="mt-6 text-center">
          <button
            onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
            className="text-sm text-teal-600 hover:text-teal-800 underline focus:outline-none"
          >
            {mode === 'login'
              ? "Don't have an account? Register"
              : "Already have an account? Log in"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;