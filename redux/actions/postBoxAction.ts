import {PostBoxType} from '../../types/PostBoxType';
import {PostBoxTypeActionTypes} from '../../types/PostBoxTypeActionTypes';
import {
  ClearSelectedPostBoxTypeFunction,
  UpdateSelectedPostBoxTypeFunction,
} from '../../types/UpdateSelectedPostBoxTypeFunction';

export const updateSelectedPostBoxType: UpdateSelectedPostBoxTypeFunction = (
  postBoxType: PostBoxType,
) => {
  return {
    type: PostBoxTypeActionTypes.UPDATE_POST_BOX_TYE,
    payload: postBoxType,
  };
};

export const clearSelectedPostBoxType: ClearSelectedPostBoxTypeFunction =
  () => {
    return {
      type: PostBoxTypeActionTypes.CLEAR_POST_BOX_TYPE,
      payload: PostBoxType.NONE,
    };
  };
