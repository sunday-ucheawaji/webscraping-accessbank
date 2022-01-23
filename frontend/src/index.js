import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegisterForm from './components/RegisterForm';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Scraper from './components/Scraper';
import { Provider } from 'react-redux';
import store from './redux/store';
import About from './components/About';

const token = localStorage.getItem('token');
console.log('root', token);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="register" element={<RegisterForm />} />
        <Route path="login" element={<Login />} />
        <Route path="scraper" element={<Scraper token={token} />} />
        <Route path="about" element={<About />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
