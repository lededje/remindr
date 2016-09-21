import configureStore from './configureStore';

describe('Store generator', () => {
  it('returns a store', () => {
    const store = configureStore();

    // It's storish
    expect(store.dispatch).toEqual(jasmine.any(Function));
    expect(store.subscribe).toEqual(jasmine.any(Function));
  });
});
