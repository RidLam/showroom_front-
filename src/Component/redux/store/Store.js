import { createStore, applyMiddleware, compose  } from "redux";
import RootReducer from "../reducer/RootReducer";
import createSagaMiddleware from 'redux-saga';
import { watchAll } from "../../saga/sagas";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'



const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, RootReducer);
const sagaMiddleware = createSagaMiddleware();

export const history = createBrowserHistory();
const browserHistory = routerMiddleware(history);

let store = createStore(
  RootReducer(history),
  compose(
    applyMiddleware(sagaMiddleware, browserHistory),
    window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : f => f
  )
  )
  //export let persistor = persistStore(store)
// mount it on the Store
// const store = createStore(
//   RootReducer,
//   compose(
//     applyMiddleware(sagaMiddleware),
//     window.__REDUX_DEVTOOLS_EXTENSION__
//     ? window.__REDUX_DEVTOOLS_EXTENSION__()
//     : f => f
//   )
  
// )

// then run the saga
sagaMiddleware.run(watchAll)


export default store;