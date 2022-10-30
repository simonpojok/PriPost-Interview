import {PostBoxTypeActionTypes} from './PostBoxTypeActionTypes';
import {PostBoxType} from './PostBoxType';

export interface PostBoxTypeAction {
  type: PostBoxTypeActionTypes;
  payload: PostBoxType;
}
