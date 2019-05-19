import axios from 'axios';
import Cookies from 'js-cookie';
import api from './index';

jest.mock('axios');
jest.mock('js-cookie');

describe('components', () => {
  describe('api', () => {
    it('should properly return repositories data', (done) => {
      const repoData = { repository: 'data' };
      axios.get.mockImplementation(() => Promise.resolve({ data: repoData }));

      api.getRepositories().then((response) => {
        expect(response).toEqual(repoData);
        expect(axios.get).toHaveBeenCalledWith('/api/repository/');
        done();
      });
    });

    it('should properly retrieve repository data by name', (done) => {
      const repoName = 'repository-name';
      const repoData = { name: repoName };
      axios.get.mockImplementation(() => Promise.resolve({ data: repoData }));

      api.retrieveRepo(repoName).then((response) => {
        expect(response).toEqual(repoData);
        expect(axios.get).toHaveBeenCalledWith(`/api/retrieve_repo/${repoName}`);
        done();
      });
    });

    it('should properly retrieve commits', (done) => {
      const limit = 1;
      const offset = 9;
      const commits = [{ sha: 'hash' }];
      const requestData = { results: commits };
      axios.get.mockImplementation(() => Promise.resolve({ data: requestData }));

      api.retrieveCommits(limit, offset).then((response) => {
        expect(response).toEqual(commits);
        expect(axios.get).toHaveBeenCalledWith(`/api/commit/?limit=${limit}&offset=${offset}`);
        done();
      });
    });

    it('should properly retrieve commits filtered by repository name', (done) => {
      const limit = 1;
      const offset = 9;
      const repoName = 'repository-name';
      const commits = [{ sha: 'hash' }];
      const requestData = { results: commits };
      axios.get.mockImplementation(() => Promise.resolve({ data: requestData }));

      api.retrieveRepoCommits(repoName, limit, offset).then((response) => {
        expect(response).toEqual(commits);
        expect(axios.get).toHaveBeenCalledWith(`/api/commit/?repo=${repoName}&limit=${limit}&offset=${offset}`);
        done();
      });
    });

    it('should properly add repo', (done) => {
      const repoPayload = { repository: 'data' };
      axios.create.mockImplementation(() => axios);
      axios.post.mockImplementation(() => Promise.resolve({ data: repoPayload }));
      const expectedToken = 'token-value';
      Cookies.get.mockImplementation(() => expectedToken);

      api.addRepo(repoPayload).then((response) => {
        expect(response).toEqual(repoPayload);
        expect(Cookies.get).toHaveBeenCalledWith('csrftoken');
        expect(axios.create).toHaveBeenCalledWith({ headers: { 'X-CSRFToken': expectedToken } });
        expect(axios.post).toHaveBeenCalledWith('/api/repository/', repoPayload);
        done();
      });
    });

    it('should properly return user data', (done) => {
      const userData = { user: 'data' };
      axios.get.mockImplementation(() => Promise.resolve({ data: userData }));

      api.getUser().then((response) => {
        expect(response).toEqual(userData);
        expect(axios.get).toHaveBeenCalledWith('/api/current_user');
        done();
      });
    });
  });
});
