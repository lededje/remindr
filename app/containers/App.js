import React from 'react';
import { Provider } from 'react-redux';

import RemindrApp from './RemindrApp';
import configureStore from '../util/configureStore';

const store = configureStore();

export default function App() {
  return (
    <Provider store={store}>
      <RemindrApp />
    </Provider>
  );
}
