import { createStore, applyMiddleware, compose  } from "redux";
import RootReducer from "../reducer/RootReducer";
import createSagaMiddleware from 'redux-saga';
import { watchAll } from "../../saga/sagas";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { createBrowserHistory } from 'history'
//import { routerMiddleware } from 'connected-react-router'
import persisteState from 'redux-localstorage'
//import adapter from 'redux-localstorage/lib/'
import { routerMiddleware } from 'react-router-redux'
import filter from 'redux-localstorage-filter'





export default function configureStore(history) {
  const userData = compose(filter('userData'));
  //const reduxRouterMiddleWare = routerMiddleware();
  const sagaMiddleware = createSagaMiddleware();
  const middleWares = [sagaMiddleware]
  const middleWareEnhancer = applyMiddleware(...middleWares);

  

  const enhancer = process.env.NODE_ENV !== 'production'
  && typeof window === 'object'
  && window.__REDUX_DEVTOOLS_EXTENSION__
  ? window.__REDUX_DEVTOOLS_EXTENSION__
  : f => f;
  const customEnhancer = compose(
    middleWareEnhancer,
    persistStore(createStore(RootReducer(history)), 'userReducer')
  )

  const composedEnhancers = compose(middleWareEnhancer, customEnhancer);

  const store = createStore(
      RootReducer(history),
       compose(
    applyMiddleware(sagaMiddleware),
     window.__REDUX_DEVTOOLS_EXTENSION__
     ? window.__REDUX_DEVTOOLS_EXTENSION__()
     : f => f
   )
  )

  sagaMiddleware.run(watchAll)

return store
}

// const persistedReducer = persistReducer(persistConfig, RootReducer);


// // export const history = createBrowserHistory();
// // const browserHistory = routerMiddleware(history);

// const enhancer = compose(
 
//   persistState("path", "config"),
// )

// const applyMiddlewares = []

// const userData = compose(filter('userData'))(adapter(window.sessionStorage));

// const composeEnhancers = process.env.NODE_ENV !== 'production'
//       && typeof window === 'object'
//       && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//       ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//       : compose;

// let store = createStore(
//   RootReducer(history),
//   compose(
//     applyMiddleware(sagaMiddleware, browserHistory),
//     window.__REDUX_DEVTOOLS_EXTENSION__
//     ? window.__REDUX_DEVTOOLS_EXTENSION__()
//     : f => f
//   )
//   )
//   //export let persistor = persistStore(store)
// // mount it on the Store
// // const store = createStore(
// //   RootReducer,
// //   compose(
// //     applyMiddleware(sagaMiddleware),
// //     window.__REDUX_DEVTOOLS_EXTENSION__
// //     ? window.__REDUX_DEVTOOLS_EXTENSION__()
// //     : f => f
// //   )
  
// // )

// then run the saga



//export default store;