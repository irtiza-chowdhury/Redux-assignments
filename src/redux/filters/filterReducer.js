/* eslint-disable default-param-last */
import { FEATEREDCHANGE } from './actionType';
import initialState from './initialState';

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case FEATEREDCHANGE:
      return {
        ...state,
        status: action.payload,
      };

    default:
      return state;
  }
};
export default filterReducer;
