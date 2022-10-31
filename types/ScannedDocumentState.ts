import {PhotoFile} from 'react-native-vision-camera';

export interface ScannedDocumentState {
  documents: Array<ScannedDocument>;
}

export interface ScannedDocument {
  path: string | null;
  photoFile: PhotoFile;
  editedDocument: any;
}
