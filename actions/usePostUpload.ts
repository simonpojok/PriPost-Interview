import {useState} from 'react';
import axios from 'axios';
import Config from '../config';

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
    let formData = new FormData();
    formData.append('file', {uri: path, name: 'content', type: 'pdf'});
    formData.append('postbox_id', 1);
    formData.append('location_id', 1);
    formData.append('type', 'CON');

    axios({
      method: 'POST',
      url: POST_UPLOAD_URL,
      headers: {
        Authorization: Config.AUTHORIZATION_BEARER_TOKEN,
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      data: formData,
    })
      .then(_ => {
        setPostUploadStatus(PostUploadStatus.UPLOAD_SUCCESS);
      })
      .catch(_ => {
        setPostUploadStatus(PostUploadStatus.UPLOAD_ERROR);
      });
  };

  return {postUploadStatus, uploadPostDocument};
}
