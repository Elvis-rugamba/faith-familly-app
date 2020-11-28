import { createSelector } from 'reselect';

export const selectRaw = (state) => state.language;

export const selectLanguage = createSelector(
  [selectRaw],
  (language) => language.language,
);
