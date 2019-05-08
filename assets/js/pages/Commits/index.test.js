import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Commits } from './index';
import api from '../../api';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('api');

describe('components', () => {
  describe('Commits', () => {
    const loadRepositoriesMock = jest.fn();
    const loadCommitsMock = jest.fn();
    const historyPushMock = jest.fn();

    const repositoryName = 'actual-repo-name';
    const repositoryFullName = 'username/actual-repo-name';

    const retrievedCommits = [
      {
        sha: 'a-sha',
        url: 'http://an-url',
        message: 'a commit message',
        author: 'An Author',
      },
    ];

    api.retrieveRepoCommits.mockResolvedValue(retrievedCommits);

    const actualRepository = {
      full_name: repositoryFullName,
      name: repositoryName,
      commits: retrievedCommits,
    };

    const retrievedRepositories = [
      {
        full_name: 'username/noise_repo_name',
        name: 'noise_repo_name',
      },
      actualRepository,
    ];

    api.getRepositories.mockResolvedValue(retrievedRepositories);

    const commitsPageProps = {
      loadRepositories: loadRepositoriesMock,
      loadCommits: loadCommitsMock,
      match: {
        params: {
          repo_name: repositoryName,
        },
      },
      history: {
        push: historyPushMock,
      },
      user: {
        profile: {
          name: 'user name',
          username: 'username',
        },
        repositories: retrievedRepositories,
      },
      getState: jest.fn(),
    };

    it('should repository full name in Breadcrumb in active Breadcrumb Item', () => {
      const component = shallow(<Commits {...commitsPageProps} />);

      const breadcrumbItem = component.find('BreadcrumbItem').at(1);

      expect(breadcrumbItem.props().active).toEqual(true);
      expect(breadcrumbItem.text()).toEqual(repositoryFullName);
    });

    it('should home Breadcrumb item should redirect to "/"', () => {
      const component = shallow(<Commits {...commitsPageProps} />);

      component.find('BreadcrumbItem').first().simulate('click', { preventDefault: () => { } });

      expect(historyPushMock).toHaveBeenCalledWith('/');
    });

    it('should provide proper repository to CommitList', () => {
      const component = shallow(<Commits {...commitsPageProps} />);

      const commitListComponentProps = component.find('CommitList').first().props();

      expect(commitListComponentProps.repository).toEqual(actualRepository);
    });

    it('should load repositories', () => {
      shallow(<Commits {...commitsPageProps} />);

      expect(api.getRepositories).toHaveBeenCalled();
      expect(loadRepositoriesMock).toHaveBeenCalledWith(retrievedRepositories);
    });

    it('should load commits', () => {
      shallow(<Commits {...commitsPageProps} />);

      expect(api.retrieveRepoCommits).toHaveBeenCalledWith(repositoryName);
      expect(loadCommitsMock).toHaveBeenCalledWith(repositoryName, retrievedCommits);
    });

    it('should render loading with dashboard when no repo and commit is found', () => {
      const loadingProps = {
        ...commitsPageProps,
        user: {
          ...commitsPageProps.user,
          repositories: [],
        },
      };

      const component = shallow(<Commits {...loadingProps} />);

      const loadingComponent = component.find('Loading').first().text();

      expect(loadingComponent).toEqual('<Loading />');
    });
  });
});
