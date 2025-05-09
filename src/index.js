/* import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(); */

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginSignUp from './components/LoginSignUp/LoginSignUp';
import ForgotPass from './components/LoginSignUp/ForgotPass';
import NewPass from './components/LoginSignUp/NewPass';
import Home from './components/LoginSignUp/Home';
import Post from './components/LoginSignUp/Post';
import GroupPage from './components/LoginSignUp/Group';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<LoginSignUp />} />
        <Route path="/forgot-password" element={<ForgotPass />} />
        <Route path="/new-password" element={<NewPass />} />
        <Route path="/login-signup" element={<LoginSignUp />} />
        <Route path="/home" element={<Home />}>
          <Route index element={<Post />} /> {/* default view */}
          <Route path="feed" element={<Post />} />
          <Route path="group" element={<GroupPage />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
);
