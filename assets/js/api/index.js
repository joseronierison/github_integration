import axios from 'axios';
import Cookies from 'js-cookie';

const CURRENT_USER_URL = '/api/current_user';
const REPOSITORIES_URL = '/api/repository/';
const RETRIEVE_REPO_URL = '/api/retrieve_repo';
const RETRIEVE_REPO_COMMITS_URL = '/api/commit/';


function getRepositories() {
  return axios
    .get(REPOSITORIES_URL)
    .then(response => response.data);
}

function retrieveRepo(repositoryName) {
  return axios
    .get(`${RETRIEVE_REPO_URL}/${repositoryName}`)
    .then(response => response.data);
}

function retrieveCommits(limit = 30, offset = 0) {
  const url = `${RETRIEVE_REPO_COMMITS_URL}?limit=${limit}&offset=${offset}`;
  return axios
    .get(url)
    .then(response => response.data.results);
}

function retrieveRepoCommits(repositoryName, limit = 30, offset = 0) {
  const url = `${RETRIEVE_REPO_COMMITS_URL}?repo=${repositoryName}&limit=${limit}&offset=${offset}`;
  return axios
    .get(url)
    .then(response => response.data.results);
}

function addRepo(repository) {
  return axios
    .create({ headers: { 'X-CSRFToken': Cookies.get('csrftoken') } })
    .post(REPOSITORIES_URL, repository)
    .then(response => response.data);
}

function getUser() {
  return axios
    .get(CURRENT_USER_URL)
    .then(response => response.data);
}

export default {
  getRepositories,
  retrieveRepo,
  retrieveRepoCommits,
  retrieveCommits,
  addRepo,
  getUser,
};
