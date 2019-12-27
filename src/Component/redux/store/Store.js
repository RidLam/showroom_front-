import { createStore, applyMiddleware, compose  } from "redux";
import RootReducer from "../reducer/RootReducer";
import createSagaMiddleware from 'redux-saga';
import { watchAll } from "../../saga/sagas";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, RootReducer)
const sagaMiddleware = createSagaMiddleware()

let store = createStore(
  persistedReducer,
  compose(
    applyMiddleware(sagaMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : f => f
  )
  )
  export let persistor = persistStore(store)
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