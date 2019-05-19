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

const loadCommits = payload => (
  {
    type: actionTypes.LOAD_COMMITS,
    payload,

  }
);

const loadRepositoryCommits = (repoName, payload) => (
  {
    type: actionTypes.LOAD_REPOSITORY_COMMITS,
    repoName,
    payload,

  }
);

export default {
  loadUser,
  loadRepositories,
  loadCommits,
  loadRepositoryCommits,
};
