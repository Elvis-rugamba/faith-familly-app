import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import createSensitiveStorage from 'redux-persist-sensitive-storage';
import newsReducer from './modules/news/reducers';
import musicReducer from './modules/music/reducers';
import tvReducer from './modules/tv/reducers';
import radioReducer from './modules/radio/reducers';
import languageReducer from './modules/language/reducers';

// const sensitiveStorage = createSensitiveStorage({
//   keychainService: 'PickitAppKeychain',
//   sharedPreferencesName: 'PickitAppSharedPrefs',
// });

const mainPersistConfig = {
  key: 'main',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
  // blacklist: ['someEphemeralKey'],
};

// const authPersistConfig = {
//   key: 'auth',
//   storage: sensitiveStorage,
// };

let rootReducer = combineReducers({
  //   auth: persistReducer(authPersistConfig, authReducer),
  news: newsReducer,
  music: musicReducer,
  tv: tvReducer,
  radio: radioReducer,
  language: persistReducer(mainPersistConfig, languageReducer),
  //   main: persistReducer(mainPersistConfig, mainReducer),
});

export default rootReducer;
