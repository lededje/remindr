/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import {
  AppRegistry,
} from 'react-native';

import App from './app/containers/app';

function remindr() {
  return (<App />);
}

AppRegistry.registerComponent('remindr', () => remindr);
