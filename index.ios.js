import React from 'react';
import {
  AppRegistry,
} from 'react-native';

import App from './app/containers/App';

function remindr() {
  return (<App />);
}

AppRegistry.registerComponent('remindr', () => remindr);
