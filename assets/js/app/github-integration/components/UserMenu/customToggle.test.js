import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CustomToggle from './customToggle';

Enzyme.configure({ adapter: new Adapter() });

describe('components', () => {
  describe('CustomToggle', () => {
    const callback = jest.fn();
    const customToggleProps = {
      onClick: callback,
      children: "children content",
    };

    it('should render children', () => {
      const component = shallow(<CustomToggle {...customToggleProps} />);

      const customToggleContent = component.find('button').first().text();

      expect(customToggleContent).toContain(customToggleProps.children);
    });

    it('should call props onClick callback', () => {
      const component = shallow(<CustomToggle {...customToggleProps} />);

      const customToggleComponent = component.find('button').first();
      customToggleComponent.simulate('click', { preventDefault: () => { } });

      expect(callback.mock.calls.length).toEqual(1);
    });
  });
});
