import { actionTypes } from '../constants';

const loadUser = payload => (
  {
    type: actionTypes.LOAD_USER,
    payload,
  }
);

const loadRepositories = payload => (
  {
    type: actionTypes.LOAD_REPOSITORIES,
    payload,
  }
);

const loadCommits = (repoName, payload) => (
  {
    type: actionTypes.LOAD_COMMITS,
    repoName,
    payload,

  }
);

export default {
  loadUser,
  loadRepositories,
  loadCommits,
};
