import { combineReducers } from 'redux';

const initialState = {};

const user = (state = initialState, action) => {
  switch (action.type) {
    case 'LOAD_USER':
      return {
        ...state,
        profile: action.payload,
      };
    case 'LOAD_REPOSITORIES':
      return {
        ...state,
        repositories: action.payload,
      };
    case 'LOAD_COMMITS':
      return {
        ...state,
        repositories: state.repositories.map((reponsitory, index) =>{
          if (reponsitory.name === action.repoName) {
            return {...reponsitory, commits: action.payload};
          }

          return reponsitory;
        })
      };
    default:
      return state;
  }
};

export default combineReducers({
  user,
});
