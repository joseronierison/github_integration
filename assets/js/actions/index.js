const loadUser = payload => (
  {
    type: 'LOAD_USER',
    payload,
  }
);

const loadRepositories = payload => (
  {
    type: 'LOAD_REPOSITORIES',
    payload,
  }
);

const loadCommits = (repoName, payload) => (
  {
    type: 'LOAD_COMMITS',
    repoName,
    payload,

  }
);

export default {
  loadUser,
  loadRepositories,
  loadCommits,
};
