import { ActionTypes, ADD_DATA} from './Action';
import { DataState } from './types';

const initialState: DataState = {
  Data: [],
};

const Reducer = (state = initialState, action: ActionTypes): DataState => {
  switch (action.type) {
    case ADD_DATA:
      return {
        ...state,
        Data: [...state.Data, action.payload],
      };
    default:
      return state;
  }
};

export default Reducer;
