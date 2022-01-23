import React from 'react';
import styles from '../styles/Navbar.module.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/auth/authActions';

function Navbar() {
  const { loggedIn } = useSelector((state) => state.login.login);
  const dispatch = useDispatch();
  return (
    <div className={styles.container}>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>

        {loggedIn ? (
          <li>
            <Link onClick={() => dispatch(logout())} to="/">
              Logout
            </Link>
          </li>
        ) : (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Navbar;
