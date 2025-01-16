import React from 'react';
import './Login.css';

const LoginPage = () => {
  return (
    <div className="login-container">
      <div className="image-section">
        <img src="https://centrum-1k1t.onrender.com/images/student-1.WebP" alt="Login Illustration" className="login-image" />
      </div>
      <div className="form-section">
        <div className="form-wrapper">
          <h2>Welcome Back!</h2>
          <form>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" placeholder="Enter your email" required />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" placeholder="Enter your password" required />
            </div>
            <button type="submit" className="login-button">Login</button>
            <div className="forgot-password">
              <a href="/forgot-password">Forgot Password?</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
