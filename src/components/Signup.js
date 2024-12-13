import React from 'react';
import { useEffect, useRef, useState } from 'react';
import '../styles/Signup.css';
import { UserAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const inputRef = useRef(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const { createUser } = UserAuth();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!validateEmail(formData.email)) {
      setError('Invalid email format');
      return;
    }
    setError('');
    try {
      await createUser(email, password);
      navigate('/details')
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }

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
  
  const emailHandler = (event) => {
    changeHandler(event); // First, call the changeHandler
    setEmail(event.target.value); // Then, update the specific state for email
  };
  
  const passwordHandler = (event) => {
    changeHandler(event); // First, call the changeHandler
    setPassword(event.target.value); // Then, update the specific state for password
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const { googleSignIn } = UserAuth();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn()
    } catch (error) {
      console.log(error)
      setError(error)
    }
  }

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Sign Up</h2>
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            required
            onChange={changeHandler}
            ref={inputRef}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            required
            onChange={emailHandler}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            placeholder="Create a password"
            required
            onChange={passwordHandler}
          />
        </div>
        <button type="submit" className="btn">Sign Up</button>

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
          <a href="/login" className="login-link">Already have an account? Login</a>
        </div>
      </form>
    </div>
  );
}

export default Signup;
