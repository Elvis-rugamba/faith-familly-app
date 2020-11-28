import { createSelector } from 'reselect';

export const selectRaw = (state) => state.tv;

export const selectTvShows = createSelector([selectRaw], (tv) => tv.tvShows);

export const selectSingleTvShow = createSelector(
  [selectRaw],
  (tv) => tv.tvShow,
);

export const selectCategories = createSelector(
  [selectRaw],
  (tv) => tv.categories,
);

export const selectIsLoadingTvShows = createSelector(
  [selectRaw],
  (tv) => tv.isLoadingTvShows,
);

export const selectIsLoadingTvShow = createSelector(
  [selectRaw],
  (tv) => tv.isLoadingTvShow,
);

export const selectIsLoadingCategories = createSelector(
  [selectRaw],
  (tv) => tv.isLoadingCategories,
);

export const selectErrorMessage = createSelector(
  [selectRaw],
  (tv) => tv.errorMessage,
);
