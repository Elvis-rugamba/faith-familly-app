import { CHANGE_LANGUAGE } from './types';

const initialState = {
  language: 'ki-RW',
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case CHANGE_LANGUAGE:
      return { ...state, language: payload };

    default:
      return state;
  }
};
