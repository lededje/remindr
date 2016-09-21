import React from 'react';
import renderer from 'react-test-renderer';
import Header from './Header';

it('renders the header component', () => {
  const component = renderer.create(
    <Header />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
