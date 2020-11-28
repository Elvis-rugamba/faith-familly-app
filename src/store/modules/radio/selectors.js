import { createSelector } from 'reselect';

export const selectRaw = (state) => state.radio;

export const selectRadios = createSelector(
  [selectRaw],
  (radio) => radio.radios,
);

export const selectSingleRadio = createSelector(
  [selectRaw],
  (radio) => radio.radio,
);

export const selectCategories = createSelector(
  [selectRaw],
  (radio) => radio.categories,
);

export const selectIsLoadingRadios = createSelector(
  [selectRaw],
  (radio) => radio.isLoadingradios,
);

export const selectIsLoadingRadio = createSelector(
  [selectRaw],
  (radio) => radio.isLoadingradio,
);

export const selectIsLoadingCategories = createSelector(
  [selectRaw],
  (radio) => radio.isLoadingCategories,
);

export const selectErrorMessage = createSelector(
  [selectRaw],
  (radio) => radio.errorMessage,
);
