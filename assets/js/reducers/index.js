import { combineReducers } from 'redux';

const initialState = {};

const aReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOAD_INFO':
      return {
        result: action.payload,
      };
    default:
      return state;
  }
};

export default combineReducers({
  aReducer,
});
