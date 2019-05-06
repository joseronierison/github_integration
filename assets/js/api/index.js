import axios from 'axios';
import Cookies from 'js-cookie';

const CURRENT_USER_URL = '/api/current_user';
const REPOSITORIES_URL = '/api/repository/';
const RETRIEVE_REPO_URL = '/api/retrieve_repo';
const RETRIEVE_REPO_COMMITS_URL = '/api/retrieve_repo_commits';


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

function retrieveRepoCommits(repositoryName) {
  return axios
    .get(`${RETRIEVE_REPO_COMMITS_URL}/${repositoryName}`)
    .then(response => response.data);
}

function addRepo(repository) {
  return axios
    .create({headers: {'X-CSRFToken': Cookies.get('csrftoken')}})
    .post(REPOSITORIES_URL, repository)
    .then(response => response.data)
    .catch(error => {
        console.log(error.response)
    });
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
  addRepo,
  getUser,
};
