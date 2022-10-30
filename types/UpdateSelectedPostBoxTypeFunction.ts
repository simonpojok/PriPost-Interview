import {PostBoxType} from './PostBoxType';
import {PostBoxTypeAction} from './PostBoxTypeAction';

export type UpdateSelectedPostBoxTypeFunction = (
  postBoxType: PostBoxType,
) => PostBoxTypeAction;

export type ClearSelectedPostBoxTypeFunction = () => PostBoxTypeAction;
