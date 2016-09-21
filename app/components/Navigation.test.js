import React from 'react';
import renderer from 'react-test-renderer';
import Navigation from './Navigation';

it('renders the navigation component', () => {
  const dummyPressCallback = () => ('');
  const component = renderer.create(
    <Navigation selectedType={'CURRENT'} onPress={dummyPressCallback} />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
