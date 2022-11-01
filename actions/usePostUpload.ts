import {useState} from 'react';
import Config from '../config';
import {logger} from '../App';
import RNFS, {UploadFileItem} from 'react-native-fs';

const POST_UPLOAD_URL = `${Config.BASE_URL}/api/admin/v1/pripost/letters/upload`;

export enum PostUploadStatus {
  IDLE,
  UPLOADING,
  UPLOAD_SUCCESS,
  UPLOAD_ERROR,
}

export default function usePostUpload() {
  const [postUploadStatus, setPostUploadStatus] = useState<PostUploadStatus>(
    PostUploadStatus.IDLE,
  );

  const uploadPostDocument = (path: string) => {
    setPostUploadStatus(PostUploadStatus.UPLOADING);
    logger.info('FILE_PATH', path);
    const files: Array<UploadFileItem> = [
      {
        name: 'post_document',
        filename: 'post_document.pdf',
        filepath: path,
        filetype: 'application/pdf',
      },
    ];

    RNFS.uploadFiles({
      toUrl: POST_UPLOAD_URL,
      files: files,
      method: 'POST',
      headers: {
        Authorization: Config.AUTHORIZATION_BEARER_TOKEN,
        Accept: 'application/json',
      },
      fields: {
        location_id: '1',
        postbox_id: '1',
        type: 'CON',
      },
      begin: () => {
        logger.info('Begging upload');
      },
      progress: data => {
        logger.info(
          'Uploading File',
          data.totalBytesExpectedToSend,
          data.totalBytesSent,
        );
      },
    })
      .promise.then(response => {
        logger.debug('UPLOAD RESPONSE', response);
      })
      .catch(error => {
        logger.error('ERROR DURING UPLOAD', error);
      });
  };

  return {postUploadStatus, uploadPostDocument};
}
