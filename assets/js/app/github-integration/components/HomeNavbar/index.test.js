import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import HomeNavbar from './index';

Enzyme.configure({ adapter: new Adapter() });

describe('components', () => {
  describe('HomeNavbar', () => {
    const profileProps = {
      name: 'User Name',
      username: 'username',
    };

    it('should properly provide props to user menu', () => {
      const component = shallow(<HomeNavbar profile={profileProps} />);

      const componentProps = component.find('UserMenu').first().props();

      expect(componentProps).toEqual({ profile: profileProps });
    });
  });
});
