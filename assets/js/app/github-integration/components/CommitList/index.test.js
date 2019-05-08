import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CommitList from './index';

Enzyme.configure({ adapter: new Adapter() });

describe('components', () => {
  describe('CommitList', () => {
    const repositoryProps = {
      commits: [{
        url: 'http://an-url.test',
        sha: 'a-commit-sha',
        author: 'CommitTestAuthor',
        message: 'Commit message',
      }],
    };

    it('should set commit link with commit url', () => {
      const component = shallow(<CommitList repository={repositoryProps} />);

      const componentProps = component.find('a').first().props();

      expect(componentProps.href).toEqual(repositoryProps.commits[0].url);
    });

    it('should render commit content with commit sha', () => {
      const component = shallow(<CommitList repository={repositoryProps} />);

      const linkContent = component.find('a').first().text();

      expect(linkContent).toEqual(repositoryProps.commits[0].sha);
    });

    it('should render author name', () => {
      const component = shallow(<CommitList repository={repositoryProps} />);

      const linkContent = component.find('b').first().text();

      expect(linkContent).toEqual(repositoryProps.commits[0].author);
    });

    it('should render commit message', () => {
      const component = shallow(<CommitList repository={repositoryProps} />);

      const linkContent = component.find('span').first().text();

      expect(linkContent).toContain(repositoryProps.commits[0].message);
    });
  });
});
