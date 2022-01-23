import React, { useState } from 'react';
import styles from '../styles/Scraper.module.css';
import { useSelector, useDispatch } from 'react-redux';
import scraper from '../redux/scraper/scraperActions';
import { Navigate } from 'react-router-dom';

function Scraper({ token }) {
  const [input, setInput] = useState({});
  const [correctPassword, setCorrectPassword] = useState(true);
  const { message } = useSelector(state=> state.scraper.data);

  const { posting, postingError, posted } = useSelector(
    (state) => state.scraper
  );
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.password === input.pswRepeat) {
      setCorrectPassword(true);
      dispatch(scraper(input.username, input.password));
      setInput({});
    } else {
      setCorrectPassword(false);
    }
  };
  if (!token) {
    return <Navigate replace to="/login" />;
  }

  return (
    <div className={styles.wrapper}>
      <form>
        <div className={styles.container}>
          <h2> Bank Statement Scraper- Access Bank</h2>
          <p>Please Provide the required details below.</p>
          <p>This will generate the report for 60 days</p>
          <hr />
          <label htmlFor="username">
            <b> Username</b>
          </label>
          <input
            type="text"
            placeholder="Enter User Name"
            name="username"
            id="username"
            onChange={handleChange}
            value={input.username || ''}
            required
          />
          <hr />
          <label htmlFor="psw">
            <b>Password</b>
          </label>
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            id="psw"
            onChange={handleChange}
            value={input.password || ''}
            required
          />
          <label htmlFor="psw-repeat">
            <b>Repeat Password</b>
          </label>
          <input
            type="password"
            placeholder="Repeat Password"
            name="pswRepeat"
            id="psw-repeat"
            onChange={handleChange}
            value={input.pswRepeat || ''}
            required
          />
          <hr />
          <button
            onClick={handleSubmit}
            type="submit"
            className={styles.registerbtn}
          >
            SCRAPE
          </button>
          <div className={styles['container signin']}></div>
        </div>
        {posting ? (
          <h2>Loading...</h2>
        ) : postingError ? (
          <h2>Error in Posting</h2>
        ) : posted ? (
          <h3> {message}</h3>
        ) : null}
        {correctPassword ? null : (
          <h3 className={styles.correctPassword}>Incorrect Password</h3>
        )}
      </form>
    </div>
  );
}

export default Scraper;
