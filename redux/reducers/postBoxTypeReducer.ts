import {PostBoxType} from '../../types/PostBoxType';
import {PostBoxTypeState} from '../../types/PostBoxTypeState';
import {PostBoxTypeAction} from '../../types/PostBoxTypeAction';
import {PostBoxTypeActionTypes} from '../../types/PostBoxTypeActionTypes';

const initialState: PostBoxTypeState = {
  postBoxType: PostBoxType.NONE,
};

export default function postBoxTypeReducer(
  state: PostBoxTypeState = initialState,
  action: PostBoxTypeAction,
) {
  switch (action.type) {
    case PostBoxTypeActionTypes.UPDATE_POST_BOX_TYE:
      return {
        ...state,
        postBoxType: action.payload,
      };
    case PostBoxTypeActionTypes.CLEAR_POST_BOX_TYPE:
      return {
        ...state,
        postBoxType: action.payload,
      };
    default:
      return state;
  }
}
