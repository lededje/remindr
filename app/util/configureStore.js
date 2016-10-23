import { createStore, applyMiddleware, compose } from 'redux';
import * as storage from 'redux-storage';
import thunk from 'redux-thunk';
import devTools from 'remote-redux-devtools';
import createEngine from 'redux-storage-engine-reactnativeasyncstorage';

import { STATEFUL_ACTIONS } from '../actions/types';
import reducers from '../reducers';

const storageReducer = storage.reducer(reducers);
const engine = createEngine('remindr');

const middleware = storage.createMiddleware(engine, STATEFUL_ACTIONS);
// const middleware = storage.createMiddleware(engine, statefulActions);
const load = storage.createLoader(engine);

export default function configureStore(initialState) {
  const finalCreateStore = compose(
    applyMiddleware(thunk, middleware),
    devTools()
  )(createStore);

  const store = finalCreateStore(storageReducer, initialState);
  load(store);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      // So many things wrong with the next line I needn't both linting it.
      // eslint-disable-next-line
      const nextReducer = require('../reducers');
      store.replaceReducer(nextReducer);
      load(store);
    });
  }

  return store;
}
