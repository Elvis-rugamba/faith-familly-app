import { createStore, applyMiddleware } from 'redux';
import {
  persistStore,
  // persistReducer
} from 'redux-persist';
// import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
// import AsyncStorage from '@react-native-community/async-storage';
import rootReducer from './rootReducer';

// const persistConfig = {
//   key: 'root',
//   storage: AsyncStorage,
//   stateReconciler: autoMergeLevel2,
// };
// const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [thunk, createLogger()];

export const store = createStore(rootReducer, applyMiddleware(...middlewares));
export const persistor = persistStore(store);
