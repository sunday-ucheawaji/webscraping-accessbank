import {
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  REGISTRATION_FAILURE,
  REGISTRATION_SUCCESS,
  REGISTRATION_REQUEST,
  LOGOUT,
} from './actionTypes';

import axios from 'axios';

export const logout = () => {
  localStorage.removeItem('token');
  return {
    type: LOGOUT,
  };
};

export function login(email, password) {
  const loginRequest = () => {
    return {
      type: LOGIN_REQUEST,
    };
  };

  const loginSuccess = (token) => {
    return {
      type: LOGIN_SUCCESS,
      payload: token,
    };
  };

  const loginFailure = (error) => {
    return {
      type: LOGIN_FAILURE,
      payload: error,
    };
  };

  return (dispatch) => {
    dispatch(loginRequest());
    axios({
      method: 'post',
      url: 'http://127.0.0.1:8000/api/login',
      data: {
        email: email,
        password: password,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        const token = response.data.token;
        dispatch(loginSuccess(token));
        localStorage.setItem('token', token);
      })
      .catch((error) => {
        const errorMessage = error.message;
        dispatch(loginFailure(errorMessage));
      });
  };
}

export function registration(fullName, email, password) {
  const registrationRequest = () => {
    return {
      type: REGISTRATION_REQUEST,
    };
  };

  const registrationSuccess = (user) => {
    return {
      type: REGISTRATION_SUCCESS,
      payload: {
        user: user,
      },
    };
  };

  const registrationFailure = (error) => {
    return {
      type: REGISTRATION_FAILURE,
      payload: {
        error,
      },
    };
  };

  return (dispatch) => {
    dispatch(registrationRequest());
    axios({
      method: 'post',
      url: 'http://127.0.0.1:8000/api/register',
      data: {
        fullname: fullName,
        email: email,
        password: password,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        dispatch(registrationSuccess(res.data));
      })
      .catch((err) => {
        dispatch(registrationFailure());
      });
  };
}
