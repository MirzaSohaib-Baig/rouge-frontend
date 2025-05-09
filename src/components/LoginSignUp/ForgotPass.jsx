import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';  // Import Axios
import './ForgotPass.css';

import logo from '../../assets/RougeSecret.png';
import email_icon from '../../assets/email.png';
import phone_call from '../../assets/phone-call.png';

const ForgotPass = () => {

  const [action, setAction] = useState("Email");
  const [isVerificationStep, setIsVerificationStep] = useState(false);
  const [contactInfo, setContactInfo] = useState("");  // State to hold email/phone number input
  const [loading, setLoading] = useState(false);  // State for loading
  const navigate = useNavigate();

  const handleSendClick = async () => {
    if (!contactInfo) {
      alert('Please enter a valid email or phone number.');
      return;
    }

    setLoading(true);

    try {
      const requestBody = action === "Email"
          ? { email: contactInfo }  // Send email if action is Email
          : { phone: contactInfo };  // Send phone if action is Phone

      const response = await axios.post('http://127.0.0.1:8001/auth/user/password-forgot/', requestBody);

      if (response.data.success) {
        setIsVerificationStep(true);  // Go to verification step
      } else {
        alert('Failed to send verification code. Please try again.');
      }
    } catch (error) {
      console.error('Error sending request:', error);
      alert('An error occurred. Please try again later.');
    } finally {
      setLoading(false);  // Hide loading state
    }
  };


  const handleVerifyClick = () => {
    navigate('/login-signup');
  };

  return (
      <div className="auth-wrapper">
        <div className="auth-image-section">
          <img src={logo} alt="Rouge Secret" className="auth-logo"/>
        </div>
        <div className="auth-form-section">
          <div className="form-card">
            <div className="header">
              <h1>
                {!isVerificationStep
                    ? "Forgot Password"
                    : action === "Email"
                        ? "Verify Email"
                        : "Verify Phone Number"}
              </h1>
            </div>
            <div className="inputs">
              {!isVerificationStep ? (
                  <>
                    <div className="header">
                      <h4>
                        {action === "Email"
                            ? "Enter your valid Email address to receive a Verification Code"
                            : "Enter your valid Phone Number to receive a Verification Code"}
                      </h4>
                    </div>

                    <div className="inputs">
                      {action === "Phone" ? null : (
                          <div className="input">
                            <img src={email_icon} alt=""/>
                            <input
                                type="email"
                                placeholder="Enter E-mail"
                                value={contactInfo}
                                onChange={(e) => setContactInfo(e.target.value)}  // Update state
                            />
                          </div>
                      )}

                      {action === "Email" ? null : (
                          <div className="input">
                            <img src={phone_call} alt=""/>
                            <input
                                type="tel"
                                placeholder="Enter Phone Number"
                                value={contactInfo}
                                onChange={(e) => setContactInfo(e.target.value)}  // Update state
                            />
                          </div>
                      )}
                    </div>

                    <div className="submit-container">
                      <button className="submit-btn" onClick={handleSendClick} disabled={loading}>
                        {loading ? 'Sending...' : 'Send'}
                      </button>
                    </div>

                    <div className="switch-msg">
                <span
                    className="link-text"
                    onClick={() => setAction(action === "Email" ? "Phone" : "Email")}
                >
                  Try another way
                </span>
                    </div>
                  </>
              ) : (
                  <>
                    <div className="header">
                      <h4>
                        {action === "Email"
                            ? "Check your Gmail for the verification code"
                            : "Check your Phone for the verification code"}
                      </h4>
                    </div>

                    <div className="dash-inputs">
                      {[1, 2, 3, 4].map((_, i) => (
                          <input
                              key={i}
                              type="text"
                              maxLength="1"
                              className="dash-box"
                          />
                      ))}
                    </div>

                    <div className="submit-container">
                      <button className="submit-btn" onClick={handleVerifyClick}>
                        Verify
                      </button>
                    </div>

                    <div className="switch-msg">
                      <span className="link-text">Resend Code</span>
                    </div>
                  </>
              )}
            </div>
          </div>
        </div>
      </div>
  );
};

export default ForgotPass;
