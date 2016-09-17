import React from 'react';
import Counter from '../counter';
import renderer from 'react-test-renderer';

it('changes the class when hovered', () => {
  const component = renderer.create(
    <Counter counter={0} />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
