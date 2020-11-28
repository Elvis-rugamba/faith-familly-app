import {
  GET_ALL_MUSICS_START,
  GET_ALL_MUSICS_SUCCESS,
  GET_ALL_MUSICS_ERROR,
  GET_SINGLE_MUSIC_START,
  GET_SINGLE_MUSIC_SUCCESS,
  GET_SINGLE_MUSIC_ERROR,
  GET_MUSIC_CATEGORIES_START,
  GET_MUSIC_CATEGORIES_SUCCESS,
  GET_MUSIC_CATEGORIES_ERROR,
} from './types';

const initialState = {
  musics: [],
  music: null,
  categories: [],
  isLoadingMusics: false,
  isLoadingMusic: false,
  isLoadingCategories: false,
  errorMessage: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL_MUSICS_START:
      return { ...state, isLoadingMusics: true, errorMessage: null };

    case GET_ALL_MUSICS_SUCCESS:
      return {
        ...state,
        isLoadingMusics: false,
        errorMessage: null,
        musics: payload,
      };

    case GET_ALL_MUSICS_ERROR:
      return {
        ...state,
        isLoadingMusics: false,
        errorMessage: payload,
      };

    case GET_SINGLE_MUSIC_START:
      return { ...state, isLoadingMusic: true, errorMessage: null };

    case GET_SINGLE_MUSIC_SUCCESS:
      return {
        ...state,
        isLoadingMusic: false,
        errorMessage: null,
        music: payload,
      };

    case GET_SINGLE_MUSIC_ERROR:
      return {
        ...state,
        isLoadingMusic: false,
        errorMessage: payload,
      };

    case GET_MUSIC_CATEGORIES_START:
      return { ...state, isLoadingCategories: true, errorMessage: null };

    case GET_MUSIC_CATEGORIES_SUCCESS:
      return {
        ...state,
        isLoadingCategories: false,
        errorMessage: null,
        categories: payload,
      };

    case GET_MUSIC_CATEGORIES_ERROR:
      return {
        ...state,
        isLoadingCategories: false,
        errorMessage: payload,
      };

    default:
      return state;
  }
};
