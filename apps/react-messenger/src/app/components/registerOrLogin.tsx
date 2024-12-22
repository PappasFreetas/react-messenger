import React, { useState } from 'react';
import axios from 'axios';
//import { Simulate } from 'react-dom/test-utils';
//import error = Simulate.error;

const RegisterOrLogin: React.FC = () => {
  // state to toggle between login and registration forms
  const [isLogin, setIsLogin] = useState(true); // default to login form

  // state for form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  /**
   * Handle form submission
   * sends data to appropriate backend endpoint based on 'isLogin' state
   * @param e - form event
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // prevent page reload

    try {
      setError(null); // clear previous errors
      setSuccess(false); // reset success state

      // API endpoint based on current form (login or register)
      const endpoint = isLogin
        ? 'http://localhost:3000/api/auth/login'
        : 'http://localhost:3000/api/auth/register';

      // Make API call to register
      const response = await axios.post(endpoint, {
        email,
        password,
      });

      // if login is successful, save token
      if (isLogin) {
        localStorage.setItem('token', response.data.accessToken);
        alert("Login successful");
      } else {
        setSuccess(true); // registration successful
      }
    } catch (err: any) {
      // handle errors and set error message
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2x1 font-bold mb-4">
        {isLogin ? 'Log In' : 'Register'}
      </h1>

      <form onSubmit={handleSubmit} className="w-1/3 p-4 border rounded-lg shadow-md">
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium">
            Email:
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border rounded-lg mt-1"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium">
            Password:
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            className="w-full p-2 border rounded-lg mt-1"
          />
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg">
          {isLogin ? 'Log In' : 'Register'}
        </button>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}
      {success && <p className="text-green-500 mt-4">Registration successful!</p> }

      {/* Toggle Link */}
      <p className="mt-4 text-sm">
        {isLogin ? (
          <>
            Don't have an account?{' '}
            <button
              onClick={() => setIsLogin(false)} // Switch to Register form
              className="text-blue-500 underline"
              >
              Register
            </button>
          </>
        ) : (
          <>
            Already have an account?{' '}
            <button
              onClick={() => setIsLogin(true)}
              className="text-blue-500 underline"
              >
              Log In
            </button>
          </>
        )}
      </p>
    </div>
  );
};
export default RegisterOrLogin;
