import { createSelector } from 'reselect';

export const selectRaw = (state) => state.news;

export const selectNews = createSelector([selectRaw], (news) => news.news);

export const selectNewsToRender = createSelector([selectNews], (news) =>
  news ? news.filter((_, i) => i !== 0) : [],
);

export const selectResults = createSelector(
  [selectRaw],
  (news) => news.results,
);

export const selectSingleArticle = createSelector(
  [selectRaw],
  (news) => news.article,
);

export const selectRelatedArticles = createSelector(
  [selectRaw],
  (news) => news.relatedArticles,
);

export const selectCategories = createSelector(
  [selectRaw],
  (news) => news.categories,
);

export const selectIsLoadingNews = createSelector(
  [selectRaw],
  (news) => news.isLoadingNews,
);

export const selectIsLoadingMoreNews = createSelector(
  [selectRaw],
  (news) => news.isLoadingMoreNews,
);

export const selectIsLoadingArticle = createSelector(
  [selectRaw],
  (news) => news.isLoadingArticle,
);

export const selectIsLoadingCategories = createSelector(
  [selectRaw],
  (news) => news.isLoadingCategories,
);

export const selectNewsByCategory = createSelector(
  [selectRaw],
  (news) => news.newsByCategory,
);

export const selectErrorMessage = createSelector(
  [selectRaw],
  (news) => news.errorMessage,
);
