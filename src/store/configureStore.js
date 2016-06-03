import { createStore, applyMiddleware, compose } from 'redux';
import { syncHistory } from 'react-router-redux';
import { browserHistory } from 'react-router';
import DevTools from '../containers/DevTools';
import createLogger from 'redux-logger';
import rootReducer from '../reducers';
import promiseMiddleware from 'redux-promise-middleware';
import restructureResults from '../middlewares/restructure_results';

const reduxRouterMiddleware = syncHistory(browserHistory);

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(promiseMiddleware(), restructureResults, reduxRouterMiddleware, createLogger()),
      DevTools.instrument()
    )
  );

  // Required for replaying actions from devtools to work
  reduxRouterMiddleware.listenForReplays(store);

  return store;
}
