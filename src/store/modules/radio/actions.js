import {
  GET_RADIO_START,
  GET_RADIO_SUCCESS,
  GET_RADIO_ERROR,
  GET_SINGLE_RADIO_START,
  GET_SINGLE_RADIO_SUCCESS,
  GET_SINGLE_RADIO_ERROR,
  GET_RADIO_CATEGORIES_START,
  GET_RADIO_CATEGORIES_SUCCESS,
  GET_RADIO_CATEGORIES_ERROR,
} from './types';
import api from '../../../services/api';
import ApiErrorHandler from '../../../utils/ApiErrorHandler';

export const getRadios = () => async (dispatch) => {
  dispatch({
    type: GET_RADIO_START,
  });
  try {
    const res = await api.get('/app/radio');

    dispatch({
      type: GET_RADIO_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_RADIO_ERROR,
      payload: ApiErrorHandler.selectMessage(error),
    });
  }
};

export const getSingleRadio = (id) => async (dispatch) => {
  dispatch({
    type: GET_SINGLE_RADIO_START,
  });
  try {
    const res = await api.get(`/app/radio/${id}`);

    dispatch({
      type: GET_SINGLE_RADIO_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_SINGLE_RADIO_ERROR,
      payload: ApiErrorHandler.selectMessage(error),
    });
  }
};

export const getCategories = () => async (dispatch) => {
  dispatch({
    type: GET_RADIO_CATEGORIES_START,
  });
  try {
    const res = await api.get('/radio/categories');

    dispatch({
      type: GET_RADIO_CATEGORIES_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_RADIO_CATEGORIES_ERROR,
      payload: ApiErrorHandler.selectMessage(error),
    });
  }
};
