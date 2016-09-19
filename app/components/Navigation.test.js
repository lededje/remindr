import React from 'react';
import Navigation from './Navigation';
import renderer from 'react-test-renderer';

it('renders the navigation component', () => {
  const component = renderer.create(
    <Navigation selectedType={'CURRENT'} onPress={() => {}} />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
