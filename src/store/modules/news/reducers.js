import {
  GET_ALL_NEWS_START,
  GET_ALL_NEWS_SUCCESS,
  GET_ALL_NEWS_ERROR,
  LOAD_MORE_NEWS_START,
  LOAD_MORE_NEWS_SUCCESS,
  LOAD_MORE_NEWS_ERROR,
  GET_SINGLE_NEWS_START,
  GET_SINGLE_NEWS_SUCCESS,
  GET_SINGLE_NEWS_ERROR,
  GET_CATEGORIES_START,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_ERROR,
  GET_NEWS_BY_CATEGORY_START,
  GET_NEWS_BY_CATEGORY_SUCCESS,
  GET_NEWS_BY_CATEGORY_ERROR,
  LOAD_MORE_NEWS_BY_CATEGORY_START,
  LOAD_MORE_NEWS_BY_CATEGORY_SUCCESS,
  LOAD_MORE_NEWS_BY_CATEGORY_ERROR,
  GET_RELATED_ARTICLES_START,
  GET_RELATED_ARTICLES_SUCCESS,
  GET_RELATED_ARTICLES_ERROR,
  SEARCH_NEWS_START,
  SEARCH_NEWS_SUCCESS,
  SEARCH_NEWS_ERROR,
  SEARCH_MORE_NEWS_START,
  SEARCH_MORE_NEWS_SUCCESS,
  SEARCH_MORE_NEWS_ERROR,
} from './types';

const initialState = {
  news: [],
  newsByCategory: [],
  article: null,
  relatedArticles: [],
  results: [],
  categories: [],
  isLoadingNews: false,
  isLoadingMoreNews: false,
  isLoadingArticle: false,
  isLoadingCategories: false,
  errorMessage: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL_NEWS_START:
      return { ...state, isLoadingNews: true, errorMessage: null };

    case GET_ALL_NEWS_SUCCESS:
      return {
        ...state,
        isLoadingNews: false,
        errorMessage: null,
        news: payload,
        results: payload,
      };

    case GET_ALL_NEWS_ERROR:
      return {
        ...state,
        isLoadingNews: false,
        errorMessage: payload,
      };

    case LOAD_MORE_NEWS_START:
      return { ...state, isLoadingMoreNews: true, errorMessage: null };

    case LOAD_MORE_NEWS_SUCCESS:
      return {
        ...state,
        isLoadingMoreNews: false,
        errorMessage: null,
        news: [...state.news, ...payload],
        results: [...state.results, ...payload],
      };

    case LOAD_MORE_NEWS_ERROR:
      return {
        ...state,
        isLoadingMoreNews: false,
        errorMessage: payload,
      };

    case GET_SINGLE_NEWS_START:
      return { ...state, isLoadingArticle: true, errorMessage: null };

    case GET_SINGLE_NEWS_SUCCESS:
      return {
        ...state,
        isLoadingArticle: false,
        errorMessage: null,
        article: payload,
      };

    case GET_SINGLE_NEWS_ERROR:
      return {
        ...state,
        isLoadingArticle: false,
        errorMessage: payload,
      };

    case GET_RELATED_ARTICLES_START:
      return { ...state, isLoadingArticle: true, errorMessage: null };

    case GET_RELATED_ARTICLES_SUCCESS:
      return {
        ...state,
        isLoadingArticle: false,
        errorMessage: null,
        relatedArticles: payload,
      };

    case GET_RELATED_ARTICLES_ERROR:
      return {
        ...state,
        isLoadingArticle: false,
        errorMessage: payload,
      };

    case GET_CATEGORIES_START:
      return { ...state, isLoadingCategories: true, errorMessage: null };

    case GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        isLoadingCategories: false,
        errorMessage: null,
        categories: payload,
      };

    case GET_CATEGORIES_ERROR:
      return {
        ...state,
        isLoadingCategories: false,
        errorMessage: payload,
      };

    case GET_NEWS_BY_CATEGORY_START:
      return { ...state, isLoadingNews: true, errorMessage: null };

    case GET_NEWS_BY_CATEGORY_SUCCESS:
      return {
        ...state,
        isLoadingNews: false,
        errorMessage: null,
        newsByCategory: payload,
      };

    case GET_NEWS_BY_CATEGORY_ERROR:
      return {
        ...state,
        isLoadingNews: false,
        errorMessage: payload,
      };

    case LOAD_MORE_NEWS_BY_CATEGORY_START:
      return { ...state, isLoadingMoreNews: true, errorMessage: null };

    case LOAD_MORE_NEWS_BY_CATEGORY_SUCCESS:
      return {
        ...state,
        isLoadingMoreNews: false,
        errorMessage: null,
        newsByCategory: [...state.newsByCategory, ...payload],
      };

    case LOAD_MORE_NEWS_BY_CATEGORY_ERROR:
      return {
        ...state,
        isLoadingMoreNews: false,
        errorMessage: payload,
      };

    case SEARCH_NEWS_START:
      return { ...state, isLoadingNews: true, errorMessage: null };

    case SEARCH_NEWS_SUCCESS:
      return {
        ...state,
        isLoadingNews: false,
        errorMessage: null,
        results: payload,
      };

    case SEARCH_NEWS_ERROR:
      return {
        ...state,
        isLoadingNews: false,
        errorMessage: payload,
      };

    case SEARCH_MORE_NEWS_START:
      return { ...state, isLoadingMoreNews: true, errorMessage: null };

    case SEARCH_MORE_NEWS_SUCCESS:
      return {
        ...state,
        isLoadingMoreNews: false,
        errorMessage: null,
        results: [...state.results, ...payload],
      };

    case SEARCH_MORE_NEWS_ERROR:
      return {
        ...state,
        isLoadingMoreNews: false,
        errorMessage: payload,
      };

    default:
      return state;
  }
};
