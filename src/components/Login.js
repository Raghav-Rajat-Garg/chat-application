import React from 'react';
import { useEffect, useRef, useState } from 'react';
import '../styles/Login.css';
import { UserAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()
  const {signIn} = UserAuth();

  const submitHandler = async (e) => {
    e.preventDefault();
    setError('')
    try{
      await signIn(email, password)
      navigate('/details')
    } catch (error) {
      console.log(error.message)
      setError(error.message)
    }
  }
 /* const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

  const submitHandler = async (event) => {
    event.preventDefault();
    if (!validateEmail(formData.email)) {
      setError('Invalid email format');
      return;
    }

    if (formData.password && formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setError(null); // Clear any previous error

    try {
      const response = await fetch("http://localhost:3000/users", {
        method: 'POST',
        headers: {
          "Content-Type": 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorResponse = await response.json(); // Capture the error response
        throw new Error(`Error: ${response.status} - ${errorResponse.message || response.statusText}`);
      }

      const data = await response.json();
      console.log('success', data);
      setFormData({});
    } catch (error) {
      console.log("Error:", error);
      setError(error.message || 'Failed to submit form. Please try again.');
    }
  };
  const changeHandler = (event) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value
    }));
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };  */

  const { googleSignIn } = UserAuth();

  const handleGoogleSignIn = async () => {
    try{
      await googleSignIn()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="form-container">
      <h2 className="form-title">Sign In</h2>
      <form onSubmit={submitHandler}>
      <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn">Sign In</button>

        {/* Error Notification */}
        {error && (
          <p className="error-message">{error}</p>
        )}

        <div className="or-divider">OR</div>

        <button className="google-btn" onClick={handleGoogleSignIn}>
          <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="Google logo" />
          Continue with Google
        </button>

        <div className="additional-links">
          <a href="/signup" className="login-link">Don't have an account? Sign Up</a>
          <Link to="/forgot-password" className="forgot-password-link">Forgot Password?</Link>
        </div>
      </form>
    </div>
  );
}

export default Signup;