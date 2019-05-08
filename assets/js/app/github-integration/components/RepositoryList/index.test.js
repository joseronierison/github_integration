import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import RepositoryList from './index';

Enzyme.configure({ adapter: new Adapter() });

describe('components', () => {
  describe('RepositoryList', () => {
    const repositoriesProps = [{
      full_name: 'username/reponame',
      name: 'reponame',
    }];

    it('should properly set nav link url', () => {
      const component = shallow(<RepositoryList repositories={repositoriesProps} />);

      const navlinkProps = component.find('NavLink').first().props();

      expect(navlinkProps.to).toEqual(`/repository/${repositoriesProps[0].name}/commits`);
    });

    it('should render full name in nav link', () => {
      const component = shallow(<RepositoryList repositories={repositoriesProps} />);

      const navlinkContent = component.find('NavLink').props().children;

      expect(navlinkContent).toEqual(repositoriesProps[0].full_name);
    });
  });
});
