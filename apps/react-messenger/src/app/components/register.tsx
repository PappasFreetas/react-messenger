import React, { useState } from 'react';
import axios from 'axios';
import { Simulate } from 'react-dom/test-utils';
import error = Simulate.error;

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  /**
   * Handle form submission
   * @param e - form event
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // prevent page reload

    try {
      setError(null); // clear previous errors
      setSuccess(false); // reset success state

      // Make API call to register
      const response = await axios.post('http://localhost:3000/api/auth/register', {
        email,
        password,
      });

      // if successful, update success state
      setSuccess(true);
    } catch (err: any) {
      // handle errors and set error message
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2x1 font-bold mb-4">Register</h1>

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
          Register
        </button>
      </form>

      {error && <p className="text-red-500 mt-4">{error}</p>}
      {success && <p className="text-green-500 mt-4">Registration successful!</p> }
    </div>
  );
};
export default Register;
