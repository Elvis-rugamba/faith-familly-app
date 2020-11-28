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
import api from '../../../services/api';
import ApiErrorHandler from '../../../utils/ApiErrorHandler';

export const getAllMusics = () => async (dispatch) => {
  dispatch({
    type: GET_ALL_MUSICS_START,
  });
  try {
    const res = await api.get('/musics');

    dispatch({
      type: GET_ALL_MUSICS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_MUSICS_ERROR,
      payload: ApiErrorHandler.selectMessage(error),
    });
  }
};

export const getSingleMusic = (musicId) => async (dispatch) => {
  dispatch({
    type: GET_SINGLE_MUSIC_START,
  });
  try {
    const res = await api.get(`/musics/${musicId}`);

    dispatch({
      type: GET_SINGLE_MUSIC_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_MUSIC_ERROR,
      payload: ApiErrorHandler.selectMessage(error),
    });
  }
};

export const getCategories = () => async (dispatch) => {
  dispatch({
    type: GET_MUSIC_CATEGORIES_START,
  });
  try {
    const res = await api.get('/musics/categories');

    dispatch({
      type: GET_MUSIC_CATEGORIES_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_MUSIC_CATEGORIES_ERROR,
      payload: ApiErrorHandler.selectMessage(error),
    });
  }
};
