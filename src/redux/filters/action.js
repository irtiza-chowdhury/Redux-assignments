import { FEATEREDCHANGE } from './actionType';

export const feateredChange = (status) => ({
  type: FEATEREDCHANGE,
  payload: status,
});
