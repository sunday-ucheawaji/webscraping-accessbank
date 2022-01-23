import React, { useState } from 'react';
import styles from '../styles/Login.module.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../redux/auth/authActions';
import { Navigate } from 'react-router-dom';

function Login() {
  const [credentials, setCredentials] = useState({});
  const dispatch = useDispatch();
  const { loggedIn, loggingIn, logginError } = useSelector(
    (state) => state.login.login
  );

  const handleLogin = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(credentials.email, credentials.psw));
    console.log(credentials);
    setCredentials({});
  };

  if (loggedIn) {
    return <Navigate replace to="/scraper" />;
  }
  return (
    <div className={styles.wrapper__outer}>
      <form className={styles.wrapper}>
        <h1 className={styles.header}>Login</h1>
        <div className={styles.imgcontainer}>
          <img src="/avatar-user.svg" alt="Avatar" className={styles.avatar} />
        </div>
        <div className={styles.container}>
          <label htmlFor="email">
            <b>Email</b>
          </label>
          <input
            type="text"
            placeholder="Enter Email"
            name="email"
            onChange={handleLogin}
            value={credentials.email || ''}
            required
          />

          <label htmlFor={styles.psw}>
            <b>Password</b>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            name="psw"
            onChange={handleLogin}
            value={credentials.psw || ''}
            required
          />

          <button onClick={handleSubmit} type="submit">
            Login
          </button>

          <div>
            <span className={styles.psw}>
              Not Regisered? <Link to="/register">Sign up</Link>
            </span>
          </div>
          {loggingIn ? (
            <h3>Logging in ....</h3>
          ) : logginError ? (
            <h3>Wrong Password</h3>
          ) : null}
        </div>
      </form>
    </div>
  );
}

export default Login;
