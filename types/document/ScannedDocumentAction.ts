import {ScannedDocumentActionType} from './ScannedDocumentActionType';
import {ScannedDocument} from '../ScannedDocumentState';

export interface ScannedDocumentAction {
  type: ScannedDocumentActionType;
  payload: ScannedDocument;
  path: string | null;
}
