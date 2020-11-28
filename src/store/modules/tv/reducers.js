import {
  GET_ALL_TV_SHOWS_START,
  GET_ALL_TV_SHOWS_SUCCESS,
  GET_ALL_TV_SHOWS_ERROR,
  GET_SINGLE_TV_SHOW_START,
  GET_SINGLE_TV_SHOW_SUCCESS,
  GET_SINGLE_TV_SHOW_ERROR,
  GET_TV_SHOW_CATEGORIES_START,
  GET_TV_SHOW_CATEGORIES_SUCCESS,
  GET_TV_SHOW_CATEGORIES_ERROR,
} from './types';

const initialState = {
  tvShows: [],
  tvShow: null,
  categories: [],
  isLoadingTvShows: false,
  isLoadingTvShow: false,
  isLoadingCategories: false,
  errorMessage: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL_TV_SHOWS_START:
      return { ...state, isLoadingTvShows: true, errorMessage: null };

    case GET_ALL_TV_SHOWS_SUCCESS:
      return {
        ...state,
        isLoadingTvShows: false,
        errorMessage: null,
        tvShows: payload,
      };

    case GET_ALL_TV_SHOWS_ERROR:
      return {
        ...state,
        isLoadingTvShows: false,
        errorMessage: payload,
      };

    case GET_SINGLE_TV_SHOW_START:
      return { ...state, isLoadingTvShow: true, errorMessage: null };

    case GET_SINGLE_TV_SHOW_SUCCESS:
      return {
        ...state,
        isLoadingTvShow: false,
        errorMessage: null,
        tvShow: payload,
      };

    case GET_SINGLE_TV_SHOW_ERROR:
      return {
        ...state,
        isLoadingTvShow: false,
        errorMessage: payload,
      };

    case GET_TV_SHOW_CATEGORIES_START:
      return { ...state, isLoadingCategories: true, errorMessage: null };

    case GET_TV_SHOW_CATEGORIES_SUCCESS:
      return {
        ...state,
        isLoadingCategories: false,
        errorMessage: null,
        categories: payload,
      };

    case GET_TV_SHOW_CATEGORIES_ERROR:
      return {
        ...state,
        isLoadingCategories: false,
        errorMessage: payload,
      };

    default:
      return state;
  }
};
