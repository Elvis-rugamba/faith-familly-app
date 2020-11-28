import { createSelector } from 'reselect';

export const selectRaw = (state) => state.music;

export const selectMusics = createSelector(
  [selectRaw],
  (music) => music.musics,
);

export const selectSingleMusic = createSelector(
  [selectRaw],
  (music) => music.music,
);

export const selectCategories = createSelector(
  [selectRaw],
  (music) => music.categories,
);

export const selectIsLoadingMusics = createSelector(
  [selectRaw],
  (music) => music.isLoadingMusics,
);

export const selectIsLoadingMusic = createSelector(
  [selectRaw],
  (music) => music.isLoadingMusic,
);

export const selectIsLoadingCategories = createSelector(
  [selectRaw],
  (music) => music.isLoadingCategories,
);

export const selectErrorMessage = createSelector(
  [selectRaw],
  (music) => music.errorMessage,
);
