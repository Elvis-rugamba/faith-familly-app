import {
  GET_ALL_RADIO_START,
  GET_ALL_RADIO_SUCCESS,
  GET_ALL_RADIO_ERROR,
  GET_SINGLE_RADIO_START,
  GET_SINGLE_RADIO_SUCCESS,
  GET_SINGLE_RADIO_ERROR,
  GET_RADIO_CATEGORIES_START,
  GET_RADIO_CATEGORIES_SUCCESS,
  GET_RADIO_CATEGORIES_ERROR,
} from './types';

const initialState = {
  radios: [],
  radio: null,
  categories: [],
  isLoadingRadios: false,
  isLoadingRadio: false,
  isLoadingCategories: false,
  errorMessage: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL_RADIO_START:
      return { ...state, isLoadingRadios: true, errorMessage: null };

    case GET_ALL_RADIO_SUCCESS:
      return {
        ...state,
        isLoadingRadios: false,
        errorMessage: null,
        radios: payload,
      };

    case GET_ALL_RADIO_ERROR:
      return {
        ...state,
        isLoadingRadios: false,
        errorMessage: payload,
      };

    case GET_SINGLE_RADIO_START:
      return { ...state, isLoadingRadio: true, errorMessage: null };

    case GET_SINGLE_RADIO_SUCCESS:
      return {
        ...state,
        isLoadingRadio: false,
        errorMessage: null,
        radio: payload,
      };

    case GET_SINGLE_RADIO_ERROR:
      return {
        ...state,
        isLoadingRadio: false,
        errorMessage: payload,
      };

    case GET_RADIO_CATEGORIES_START:
      return { ...state, isLoadingCategories: true, errorMessage: null };

    case GET_RADIO_CATEGORIES_SUCCESS:
      return {
        ...state,
        isLoadingCategories: false,
        errorMessage: null,
        categories: payload,
      };

    case GET_RADIO_CATEGORIES_ERROR:
      return {
        ...state,
        isLoadingCategories: false,
        errorMessage: payload,
      };

    default:
      return state;
  }
};
