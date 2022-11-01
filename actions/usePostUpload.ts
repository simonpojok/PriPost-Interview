import {useState} from 'react';
import * as RNFS from 'react-native-fs';
import axios from 'axios';
import Config from '../config';

const POST_UPLOAD_URL = `${Config.BASE_URL}/api/admin/v1/pripost/letters/upload`;

export enum PostUploadStatus {
  IDLE,
  UPLOADING,
  UPLOAD_SUCCESS,
  UPLOAD_ERROR,
  READING_FILE,
}

export default function usePostUpload() {
  const [postUploadStatus, setPostUploadStatus] = useState<PostUploadStatus>(
    PostUploadStatus.IDLE,
  );

  const uploadPostDocument = (path: string) => {
    setPostUploadStatus(PostUploadStatus.READING_FILE);
    // @ts-ignore
    RNFS.readFile(path.filePath, 'ascii')
      .then(response => {
        setPostUploadStatus(PostUploadStatus.UPLOADING);
        handUploadFile(response);
      })
      .catch(error => console.log('Error Reading', error))
      .finally(() => console.log('Reading Files'));
  };

  const handUploadFile = (pdfFile: any) => {
    axios({
      method: 'POST',
      url: POST_UPLOAD_URL,
      headers: {
        Authorization: Config.AUTHORIZATION_BEARER_TOKEN,
        Accept: 'application/json',
      },
      data: {
        postbox_id: 1,
        location_id: 1,
        type: 'CON',
        file: pdfFile,
      },
    })
      .then(response => {
        setPostUploadStatus(PostUploadStatus.UPLOAD_SUCCESS);
        console.log('UPLOAD-FILE-RESPONSE', response);
      })
      .catch(error => {
        setPostUploadStatus(PostUploadStatus.UPLOAD_ERROR);
        console.log('UPLOAD-FILE-ERROR', error);
      })
      .finally(() => {
        console.log('FILE-UPLOAD-DONE');
      });
  };
  return {postUploadStatus, uploadPostDocument};
}
