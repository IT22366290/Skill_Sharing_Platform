import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userService } from '../../services/userService';
const SignIn = ({
  setIsAuthenticated
}: {
  setIsAuthenticated: (value: boolean) => void;
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const userId = await userService.signIn({
        email,
        password
      });
      localStorage.setItem('userId', userId.toString());
      setIsAuthenticated(true);
      navigate('/');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };
  return <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm" />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input type="password" required value={password} onChange={e => setPassword(e.target.value)} className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm" />
            </div>
            <button type="submit" disabled={isLoading} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>;
};
export default SignIn;