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
import api from '../../../services/api';
import ApiErrorHandler from '../../../utils/ApiErrorHandler';

export const getAllNews = (page = 1, language = 'ki-RW') => async (
  dispatch,
) => {
  dispatch({
    type: GET_ALL_NEWS_START,
  });
  try {
    const res = await api.get('/app/news', { language, page, perPage: 10 });

    dispatch({
      type: GET_ALL_NEWS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_NEWS_ERROR,
      payload: ApiErrorHandler.selectMessage(error),
    });
  }
};

export const loadMoreNews = (page = 1, language = 'ki-RW') => async (
  dispatch,
) => {
  dispatch({
    type: LOAD_MORE_NEWS_START,
  });
  try {
    const res = await api.get('/app/news', { language, page, perPage: 10 });

    dispatch({
      type: LOAD_MORE_NEWS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: LOAD_MORE_NEWS_ERROR,
      payload: ApiErrorHandler.selectMessage(error),
    });
  }
};

export const getSingleArticle = (newsId) => async (dispatch) => {
  dispatch({
    type: GET_SINGLE_NEWS_START,
  });
  try {
    const res = await api.get(`/app/news/${newsId}`);

    dispatch({
      type: GET_SINGLE_NEWS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_NEWS_ERROR,
      payload: ApiErrorHandler.selectMessage(error),
    });
  }
};

export const getCategories = () => async (dispatch) => {
  dispatch({
    type: GET_CATEGORIES_START,
  });
  try {
    const res = await api.get('/categories');

    dispatch({
      type: GET_CATEGORIES_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_CATEGORIES_ERROR,
      payload: ApiErrorHandler.selectMessage(error),
    });
  }
};

export const getNewsByCategory = (
  category,
  page = 1,
  language = 'ki-RW',
) => async (dispatch) => {
  dispatch({
    type: GET_NEWS_BY_CATEGORY_START,
  });
  try {
    const res = await api.get(`/app/news/categories/${category}`, {
      language,
      page,
      perPage: 10,
    });

    dispatch({
      type: GET_NEWS_BY_CATEGORY_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_NEWS_BY_CATEGORY_ERROR,
      payload: ApiErrorHandler.selectMessage(error),
    });
  }
};

export const loadMoreNewsByCategory = (
  category,
  page = 1,
  language = 'ki-RW',
) => async (dispatch) => {
  dispatch({
    type: LOAD_MORE_NEWS_BY_CATEGORY_START,
  });
  try {
    const res = await api.get(`/app/news/categories/${category}`, {
      language,
      page,
      perPage: 10,
    });

    dispatch({
      type: LOAD_MORE_NEWS_BY_CATEGORY_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: LOAD_MORE_NEWS_BY_CATEGORY_ERROR,
      payload: ApiErrorHandler.selectMessage(error),
    });
  }
};

export const getRelatedArticles = (
  newsId,
  category,
  language = 'ki-RW',
) => async (dispatch) => {
  dispatch({
    type: GET_RELATED_ARTICLES_START,
  });
  try {
    const res = await api.get(`/app/news/${newsId}/related`, {
      language,
      category,
    });

    dispatch({
      type: GET_RELATED_ARTICLES_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_RELATED_ARTICLES_ERROR,
      payload: ApiErrorHandler.selectMessage(error),
    });
  }
};

export const searchNews = (search, language = 'ki-RW', page = 1) => async (
  dispatch,
) => {
  dispatch({
    type: SEARCH_NEWS_START,
  });
  try {
    const res = await api.get('/app/news', {
      search,
      language,
      page,
      perPage: 100,
    });

    dispatch({
      type: SEARCH_NEWS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: SEARCH_NEWS_ERROR,
      payload: ApiErrorHandler.selectMessage(error),
    });
  }
};

export const searchMoreNews = (query, language = 'ki-RW', page = 1) => async (
  dispatch,
) => {
  dispatch({
    type: SEARCH_MORE_NEWS_START,
  });
  try {
    const res = await api.get(`/app/news/search/${query}`, {
      query,
      language,
      page,
      perPage: 100,
    });

    dispatch({
      type: SEARCH_MORE_NEWS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: SEARCH_MORE_NEWS_ERROR,
      payload: ApiErrorHandler.selectMessage(error),
    });
  }
};
