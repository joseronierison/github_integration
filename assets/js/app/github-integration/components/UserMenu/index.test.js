import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import UserMenu from './index';

Enzyme.configure({ adapter: new Adapter() });

describe('components', () => {
  describe('UserMenu', () => {
    const profileProps = {
      name: 'user name',
    };

    it('should render user name in dropdown menu', () => {
      const component = shallow(<UserMenu profile={profileProps} />);

      const userMenuContent = component.find('Dropdown').first().text();

      expect(userMenuContent).toContain(profileProps.name);
    });

    it('should redirect to logout in Logout link', () => {
      const component = shallow(<UserMenu profile={profileProps} />);

      const logoutProps = component.find('DropdownItem').props();

      expect(logoutProps.href).toEqual('/logout');
    });
  });
});
