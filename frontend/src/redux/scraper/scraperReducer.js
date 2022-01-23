import { POST_REQUEST, POST_SUCCESS, POST_FAILURE } from './actionTypes';

const initialState = {
  posting: false,
  posted: false,
  postingError: '',
  data: '',
};

export default function scraperReducer(state = initialState, action) {
  switch (action.type) {
    case POST_REQUEST:
      return {
        posting: true,
        posted: false,
        postingError: '',
        data: '',
      };
    case POST_SUCCESS:
      return {
        posting: false,
        posted: true,
        postingError: '',
        data: action.payload,
      };
    case POST_FAILURE:
      return {
        posting: false,
        posted: false,
        postingError: action.payload,
        data: '',
      };
      default: return state
  }
}
