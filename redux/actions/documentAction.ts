import {ScannedDocumentActionType} from '../../types/document/ScannedDocumentActionType';
import {ScannedDocument} from '../../types/ScannedDocumentState';
import {AddDocumentActionCreatorType} from '../../types/document/action/AddDocumentActionCreatorType';

export const AddDocumentActionCreator: (
  document: ScannedDocument,
) => AddDocumentActionCreatorType = document => {
  return {
    type: ScannedDocumentActionType.ADD_SCANNED_DOCUMENT,
    payload: document,
  };
};

export const ReplaceDocumentActionCreator = (
  path: string,
  document: ScannedDocument,
) => {
  return {
    type: ScannedDocumentActionType.REPLACE_SCANNED_DOCUMENT,
    payload: {
      path: path,
      document,
    },
  };
};
