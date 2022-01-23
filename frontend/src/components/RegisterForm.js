import React, { useState } from 'react';
import styles from '../styles/RegisterForm.module.css';
import { Link, Navigate } from 'react-router-dom';
import { registration } from '../redux/auth/authActions';
import { useDispatch, useSelector } from 'react-redux';

function RegisterForm() {
  const [regInput, setRegInput] = useState({});
  const [correctPassword, setCorrectPassword] = useState(true);
  const dispatch = useDispatch();
  const { registered, registering, registrationError } = useSelector(
    (state) => state.register.register
  );
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (regInput.psw === regInput.pswRepeat) {
      setCorrectPassword(true);
      dispatch(registration(regInput.fullName, regInput.email, regInput.psw));
      setRegInput({});
    } else {
      setCorrectPassword(false);
    }
  };

  if (registered) {
    return <Navigate replace to="/login" />;
  }

  return (
    <div className={styles.wrapper}>
      <form>
        <div className={styles.container}>
          <h2 className={styles.title}>Register</h2>
          <p>Please fill in this form to create an account.</p>
          <hr />
          <label htmlFor="fullName">
            <b>Full Name</b>
          </label>
          <input
            type="text"
            placeholder="Enter Full Name"
            name="fullName"
            id="fullName"
            onChange={(e) => handleChange(e)}
            value={regInput.fullName || ''}
            required
          />
          <hr />
          <label htmlFor="email">
            <b>Email</b>
          </label>
          <input
            type="text"
            placeholder="Enter Email"
            name="email"
            id="email"
            onChange={handleChange}
            value={regInput.email || ''}
            required
          />
          <label htmlFor="psw">
            <b>Password</b>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            name="psw"
            id="psw"
            onChange={handleChange}
            value={regInput.psw || ''}
            required
          />
          <label htmlFor="pswRepeat">
            <b>Repeat Password</b>
          </label>
          <input
            type="password"
            placeholder="Repeat Password"
            name="pswRepeat"
            id="pswRepeat"
            onChange={handleChange}
            value={regInput.pswRepeat || ''}
            required
          />
          <hr />

          <button
            onClick={handleSubmit}
            type="submit"
            className={styles.registerbtn}
          >
            Register
          </button>
          <div className={styles['container signin']}>
            <p>
              Already have an account? <Link to="/login">Sign in</Link>.
            </p>
            <div>
              {registering ? (
                <h3>Registering...</h3>
              ) : registrationError ? (
                <h3>Error in Registration</h3>
              ) : null}
            </div>
          </div>
          {correctPassword ? null : <h3>Passwords do not match</h3>}
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
