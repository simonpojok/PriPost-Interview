import {ScannedDocumentState} from '../../types/ScannedDocumentState';
import {ScannedDocumentAction} from '../../types/document/ScannedDocumentAction';
import {ScannedDocumentActionType} from '../../types/document/ScannedDocumentActionType';

const initialState: ScannedDocumentState = {
  documents: [],
};

export default function documentReducer(
  state: ScannedDocumentState = initialState,
  action: ScannedDocumentAction,
) {
  switch (action.type) {
    case ScannedDocumentActionType.ADD_SCANNED_DOCUMENT:
      return {
        ...state,
        documents: [...state.documents, action.payload],
      };
    case ScannedDocumentActionType.REPLACE_SCANNED_DOCUMENT: {
      const documents = state.documents.map(document => {
        console.log(
          'TEST',
          document.photoFile.path === action.payload.path,
          document,
          action.payload,
        );
        if (document.photoFile.path === action.payload.path) {
          // action.payload.path = null;
          return action.payload;
        }
        return document;
      });
      return {...state, documents: documents};
    }

    case ScannedDocumentActionType.UPDATE_SCANNED_DOCUMENT:
      return {
        ...state,
        documents: state.documents.map(document => {
          if (document.photoFile.path === action.payload.photoFile.path) {
            return action.payload;
          }
          return document;
        }),
      };

    default:
      return state;
  }
}
