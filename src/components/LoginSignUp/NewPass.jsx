import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios
import './NewPass.css';

import logo from '../../assets/RougeSecret.png';
import password_icon from '../../assets/password.png';

const NewPass = () => {
    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSaveClick = async () => {
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        try {
            const response = await axios.patch('http://127.0.0.1:8001/auth/user/password-reset/', {
                password,
                confirmPassword
            });

            if (response.status === 200) {
                alert('Password updated successfully!');
                navigate('/login-signup', { state: { mode: 'Login' } });
            } else {
                alert('Failed to update password.');
            }
        } catch (error) {
            console.error('Error updating password:', error);
            alert('An error occurred while updating the password.');
        }
    };

    return (
        <div className="container">
            <div className="center-wrapper">
                <h1>Create New Password</h1>
                <div className="logo">
                    <img src={logo} alt="Rouge Secret" />
                </div>

                <div className="form-card">
                    <div className="header">
                        <h4>Your New Password Must Be Different From Previous</h4>
                    </div>
                    <div className="inputs">
                        <div className="input">
                            <img src={password_icon} alt="" />
                            <input
                                type="password"
                                placeholder="Enter Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="input">
                            <img src={password_icon} alt="" />
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <div className="submit-container">
                            <button className="submit-btn" onClick={handleSaveClick}>
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewPass;
