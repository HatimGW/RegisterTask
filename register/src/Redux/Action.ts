import { DATA } from './types';

export const ADD_DATA = "ADD_DATA";

interface AddAction {
  type: typeof ADD_DATA;
  payload: DATA;
}

export type ActionTypes = AddAction;

export const addData = (Data: DATA): AddAction => ({
  type: ADD_DATA,
  payload: Data,
});
