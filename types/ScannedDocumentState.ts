import {PhotoFile} from 'react-native-vision-camera';

export interface ScannedDocumentState {
  documents: Array<ScannedDocument>;
}

export interface ScannedDocument {
  photoFile: PhotoFile;
  editedDocument: any;
}
