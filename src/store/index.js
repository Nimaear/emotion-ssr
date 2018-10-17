// @flow
import 'regenerator-runtime/runtime';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from 'reducers';
import createSagaMiddleware, { END } from 'redux-saga';
import { all } from 'redux-saga/effects';
import getSagas from 'sagas';

type StoreT = {
  initialState: {},
  middleware: Array<() => void>,
};

export const configureStore = ({ initialState, middleware = [] }: StoreT = {}) => {
  if (typeof window !== 'undefined' && window.store) {
    return window.store;
  }

  const devtools =
    typeof window !== 'undefined' &&
    typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      actionsBlacklist: [],
    });

  const composeEnhancers = devtools || compose;
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...[thunk, sagaMiddleware].concat(...middleware)))
  );
  store.close = () => store.dispatch(END);

  let rootTask = sagaMiddleware.run(function*() {
    yield all(getSagas());
  });

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers/index').default;
      store.replaceReducer(nextRootReducer);
    });

    module.hot.accept('../sagas', () => {
      const getNewSagas = require('../sagas/index').default;
      rootTask.cancel();
      rootTask.done.then(() => {
        rootTask = sagaMiddleware.run(function* replacedSaga() {
          yield all(getNewSagas());
        });
      });
    });
  }

  const ret = {
    store: {
      ...store,
      runSaga: sagaMiddleware.run,
    },
    getRootTask: () => rootTask,
  };
  if (typeof window !== 'undefined') {
    window.store = ret;
  }
  return ret;
};

export default configureStore;
