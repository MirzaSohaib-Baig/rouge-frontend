import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import * as countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';

import './LoginSignUp.css';

import user_icon from '../../assets/person.png';
import email_icon from '../../assets/email.png';
import password_icon from '../../assets/password.png';
import google from '../../assets/google.png';
import apple from '../../assets/apple-logo.png';
import logo from '../../assets/RougeSecret.png';
import phone_call from '../../assets/phone-call.png';
import ceiling from '../../assets/ceiling.png';
import placeholder from '../../assets/placeholder.png';
import calendar from '../../assets/calendar.png';
import genderfluid from '../../assets/gender-fluid.png';

import Select from 'react-select';
import axios from 'axios';

countries.registerLocale(enLocale);
const countryOptions = Object.entries(countries.getNames('en', { select: 'official' })).map(
    ([code, name]) => ({ value: code, label: name })
);

const LoginSignUp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const initialMode = location.state?.mode || "Sign Up";
  const [action, setAction] = useState(initialMode);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    height: '',
    dob: '',
    gender: '',
    email: '',
    password: '',
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (action === 'Sign Up') {
        const response = await axios.post(`http://127.0.0.1:8001/auth/user/register/`, {
          username: formData.name,
          phone: formData.phone,
          height: formData.height,
          date_of_birth: formData.dob,
          gender: formData.gender,
          email: formData.email,
          password: formData.password,
          country: selectedCountry?.label || '',
          is_active: true,
        });
        console.log('User registered:', response.data);
        alert("Registration successful!");
      } else {
        const response = await axios.post(`http://127.0.0.1:8001/auth/login-jwt/`, {
          email: formData.email,
          password: formData.password,
          is_active: true
        });
        console.log('User login:', response.data.data);
        alert("Login successful!");
        localStorage.setItem("token", response?.data?.data?.access_token);
        // console.log("Token:", localStorage.getItem("token"));
        localStorage.setItem("username", response?.data?.data?.username);
        
        navigate('/home/feed')
      }
    } catch (error) {
      console.error('API Error:', error.response?.data || error.message);
      alert("An error occurred. Please try again.");
    }
  };

  return (
      <div className="auth-wrapper">
        <div className="auth-image-section">
          <img src={logo} alt="Rouge Secret" className="auth-logo"/>
        </div>
        <div className="auth-form-section">
          <div className="form-card">
            <div className="header">
              <h2>{action === "Login" ? "Login to Rouge Secret" : "Welcome to Rouge Secret"}</h2>
            </div>

            <div className="inputs">
              {action === "Login" ? null : (
                  <>
                    <div className="input">
                      <img src={user_icon} alt=""/>
                      <input
                          type="text"
                          placeholder="Enter Name"
                          value={formData.name}
                          onChange={(e) => handleChange('name', e.target.value)}
                      />
                    </div>
                    <div className="input">
                      <img src={phone_call} alt=""/>
                      <input
                          type="tel"
                          placeholder="Enter Phone Number"
                          value={formData.phone}
                          onChange={(e) => handleChange('phone', e.target.value)}
                      />
                    </div>
                    <div className="input">
                      <img src={ceiling} alt=""/>
                      <input
                          type="text"
                          placeholder="Enter Height (e.g. 160 cm)"
                          value={formData.height}
                          onChange={(e) => handleChange('height', e.target.value)}
                      />
                    </div>
                    <div className="input">
                      <img src={placeholder} alt=""/>
                      <div className="custom-select-wrapper">
                        <Select
                            options={countryOptions}
                            placeholder="Select Country"
                            value={selectedCountry}
                            onChange={setSelectedCountry}
                            className="react-select-container"
                            classNamePrefix="react-select"
                        />
                      </div>
                    </div>
                    <div className="input">
                      <img src={calendar} alt=""/>
                      <input
                          type="date"
                          placeholder="Date of Birth"
                          value={formData.dob}
                          onChange={(e) => handleChange('dob', e.target.value)}
                      />
                    </div>
                    <div className="input">
                      <img src={genderfluid} alt=""/>
                      <input
                          type="text"
                          placeholder="Enter Your Gender"
                          value={formData.gender}
                          onChange={(e) => handleChange('gender', e.target.value)}
                      />
                    </div>
                  </>
              )}

              <div className="input">
                <img src={email_icon} alt=""/>
                <input
                    type="email"
                    placeholder="Enter E-mail"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                />
              </div>
              <div className="input">
                <img src={password_icon} alt=""/>
                <input
                    type="password"
                    placeholder="Enter Password"
                    value={formData.password}
                    onChange={(e) => handleChange('password', e.target.value)}
                />
              </div>
            </div>

            <div className="options-row">
              <label className="checkbox-label">
                <input type="checkbox"/> Accept terms and conditions
              </label>
              {action === "Sign Up" ? null : (
                  <div className="forgot-password">
                    <Link to="/forgot-password">Forgot Password?</Link>
                  </div>
              )}
            </div>

            <div className="submit-container">
              <button className="submit-btn" onClick={handleSubmit}>
                {action === "Login" ? "LOGIN" : "SIGN UP"}
              </button>
            </div>

            <div className="switch-msg">
            {action === "Login" ? (
                  <>
                    <span>New to RougeSecret? </span>
                    <span className="link-text" onClick={() => setAction("Sign Up")}>Sign Up</span>
                  </>
              ) : (
                  <>
                    <span>Already have an account? </span>
                    <span className="link-text" onClick={() => setAction("Login")}>Login</span>
                  </>
              )}
            </div>

            {action === "Login" && (
                <>
                  <div className="divider">
                    <hr/>
                    <span>OR</span>
                    <hr/>
                  </div>

                  <div className="social-buttons">
                    <button className="social-btn">
                      <img src={google} style={{height: '20px'}} alt="Google"/> Continue with Google
                    </button>
                    <button className="social-btn">
                      <img src={apple} style={{height: '20px'}} alt="Apple"/> Continue with Apple
                    </button>
                  </div>
                </>
            )}
          </div>
        </div>
      </div>
  );
};

export default LoginSignUp;
