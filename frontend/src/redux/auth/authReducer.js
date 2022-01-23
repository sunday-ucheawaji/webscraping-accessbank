import {
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  REGISTRATION_FAILURE,
  REGISTRATION_SUCCESS,
  REGISTRATION_REQUEST,
  LOGOUT,
} from './actionTypes';

const initialStateLogin = {
  login: {
    loggedIn: false,
    loggingIn: false,
    logginError: '',
  },
  logout: true,
  token: '',
};

export function authReducerLogin(state = initialStateLogin, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        login: {
          loggedIn: false,
          loggingIn: true,
          logginError: '',
        },
        logout: false,
        token: '',
      };
    case LOGIN_SUCCESS:
      return {
        login: {
          loggedIn: true,
          loggingIn: false,
          logginError: '',
        },
        logout: false,
        token: action.payload,
      };
    case LOGIN_FAILURE:
      return {
        login: {
          loggedIn: false,
          loggingIn: false,
          logginError: action.payload,
        },
        logout: true,
        token: '',
      };

    case LOGOUT:
      return {
        login: {
          loggedIn: false,
          loggingIn: false,
          logginError: '',
        },
        logout: true,
        token: '',
      };

    default:
      return state;
  }
}

const initialStateRegister = {
  register: {
    registered: false,
    registering: false,
    registrationError: '',
  },
  user: {},
};

export function authReducerRegister(state = initialStateRegister, action) {
  switch (action.type) {
    case REGISTRATION_REQUEST:
      return {
        register: {
          registered: false,
          registering: true,
          registrationError: '',
        },
        user: {},
      };
    case REGISTRATION_SUCCESS:
      return {
        register: {
          registered: true,
          registering: false,
          registrationError: '',
        },
        user: action.payload.user,
      };
    case REGISTRATION_FAILURE:
      return {
        register: {
          registered: false,
          registering: false,
          registrationError: action.payload.error,
        },
        user: {},
      };
    default:
      return state;
  }
}
