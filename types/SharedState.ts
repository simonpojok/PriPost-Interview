import {PostBoxType} from './PostBoxType';
import {ScannedDocument} from './ScannedDocumentState';

export interface SharedState {
  postBoxType: PostBoxType;
  scannedDocuments: Array<ScannedDocument>;
}
