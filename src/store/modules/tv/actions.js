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
import api from '../../../services/api';
import ApiErrorHandler from '../../../utils/ApiErrorHandler';

export const getAllTvShows = () => async (dispatch) => {
  dispatch({
    type: GET_ALL_TV_SHOWS_START,
  });
  try {
    const res = await api.get('/app/tv');

    dispatch({
      type: GET_ALL_TV_SHOWS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_TV_SHOWS_ERROR,
      payload: ApiErrorHandler.selectMessage(error),
    });
  }
};

export const getSingleTvShow = (id) => async (dispatch) => {
  dispatch({
    type: GET_SINGLE_TV_SHOW_START,
  });
  try {
    const res = await api.get(`/app/tv/${id}`);

    dispatch({
      type: GET_SINGLE_TV_SHOW_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_TV_SHOW_ERROR,
      payload: ApiErrorHandler.selectMessage(error),
    });
  }
};

export const getCategories = () => async (dispatch) => {
  dispatch({
    type: GET_TV_SHOW_CATEGORIES_START,
  });
  try {
    const res = await api.get('/tv/categories');

    dispatch({
      type: GET_TV_SHOW_CATEGORIES_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_TV_SHOW_CATEGORIES_ERROR,
      payload: ApiErrorHandler.selectMessage(error),
    });
  }
};
