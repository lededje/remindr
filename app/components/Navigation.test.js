import 'react-native-mock/mock';

import React from 'react';
import { shallow } from 'enzyme';

import Navigation from './Navigation';

let onPress, selectedType;

describe('Navigation', () => {
  beforeEach(() => {
    onPress = jest.fn();
    selectedType = 'CURRENT';
  });

  it('should render', () => {
    shallow(
      <Navigation onPress={onPress} selectedType={selectedType} />
    );
  });
});
