import { CHANGE_LANGUAGE } from './types';

export const setLanguage = (language) => ({
  type: CHANGE_LANGUAGE,
  payload: language,
});
