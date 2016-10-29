import 'react-native-mock/mock';

import React from 'react';
import { shallow } from 'enzyme';

import Header from './Header';

describe('Header', () => {
  it('should render', () => {
    shallow(<Header />);
  });
});
