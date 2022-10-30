import {ScannedDocumentActionType} from '../ScannedDocumentActionType';
import {ScannedDocument} from '../../ScannedDocumentState';

export interface AddDocumentActionCreatorType {
  type: ScannedDocumentActionType.ADD_SCANNED_DOCUMENT;
  payload: ScannedDocument;
}
