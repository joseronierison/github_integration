import { actionTypes } from '../constants';
import user from './index';

describe('user reducer', () => {
  const profile = { name: 'name', username: 'username' };
  const repositories = [{ name: 'name', full_name: 'username/full_name' }];
  const commits = [{ sha: 'a-sha', message: 'a-message' }];

  it('should return the initial state', () => {
    expect(user(undefined, {})).toEqual({ user: { } });
  });

  it('should load user profile', () => {
    const action = { type: actionTypes.LOAD_USER, payload: profile };

    expect(user(undefined, action)).toEqual({ user: { profile } });
  });

  it('should load user repositories', () => {
    const action = { type: actionTypes.LOAD_REPOSITORIES, payload: repositories };

    expect(user(undefined, action)).toEqual({ user: { repositories } });
  });

  it('should load user repository commits when repository is found', () => {
    const actualRepository = { name: 'actual_repo_name', full_name: 'username/actual_repo_name' };
    const predefinedState = {
      user: {
        profile,
        repositories: [...repositories, actualRepository],
      },
    };

    const action = { type: actionTypes.LOAD_COMMITS, repoName: 'actual_repo_name', payload: commits };

    const expectedState = {
      user: {
        profile,
        repositories: [...repositories, { ...actualRepository, ...commits }],
      },
    };

    expect(user(predefinedState, action)).toEqual(expectedState);
  });

  it('should left state as it is when repo was not load yet', () => {
    const predefinedState = {
      user: {
        profile,
        repositories: [...repositories],
      },
    };

    const action = { type: actionTypes.LOAD_COMMITS, repoName: 'a-repo-name', payload: commits };

    expect(user(predefinedState, action)).toEqual(predefinedState);
  });
});
