import React from 'react';
import './Login.css';

const RegisterPage = () => {
  return (
    <div className="login-container">
      <div className="image-section">
        <img src="https://centrum-1k1t.onrender.com/images/student-1.WebP" alt="Login Illustration" className="login-image" />
      </div>
      <div className="form-section">
        <div className="form-wrapper">
          <h2>Sign Up!</h2>
          <form>
            <div className="input-group">
              <label htmlFor="fisrtname">First Name</label>
              <input type="text" id="firstname" name="firstname" placeholder="Enter your First Name" required />
            </div>
            <div className="input-group">
              <label htmlFor="lastname">Last Name</label>
              <input type="text" id="lastname" name="lastname" placeholder="Enter your Last Name" required />
            </div>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" placeholder="Enter your email" required />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" placeholder="Enter your password" required />
            </div>
            <button type="submit" className="login-button">Sign Up</button>
            <div className="forgot-password">
              <a href="/forgot-password">Forgot Password?</a>
            </div>
          </form>
          {/* Add a separator if you like */}
          <div className="separator">or</div>
          {/* Google Login Button */}
          <button type="button" className="google-login-button">
            <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google logo" className="google-logo" />
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;