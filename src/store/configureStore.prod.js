import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import serverApi from '../middleware/serverApi';
import rootReducer from '../reducers';
import login from '../middleware/login';

const logger = createLogger();
let store;
const configureStore = preloadedState => {
  if (!(window.__REDUX_DEVTOOLS_EXTENSION__ || window.__REDUX_DEVTOOLS_EXTENSION__)) {
    store = createStore(
      rootReducer,
      preloadedState,
      compose(applyMiddleware(thunk, login, serverApi, logger))
    );
  } else {
    store = createStore(
      rootReducer,
      preloadedState,
      compose(
        applyMiddleware(thunk, login, serverApi, logger),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
      )
    );
  }
  return store;
};

export default configureStore;
