import {useEffect, useState} from 'react';
import axios from 'axios';
import Config from '../config';
import PostBox from '../types/PostBox';

const POST_BOXES_URL = `${Config.BASE_URL}/api/admin/v1/pripost/letters/postboxes`;

export default function usePostBoxes() {
  const [postBoxes, setPostBoxes] = useState<Array<PostBox>>([]);
  const [isPostBoxLoading, setIsPostBoxLoading] = useState(false);
  const [postBoxError, setPostBoxError] = useState({});
  console.log('Prepared to call');

  useEffect(() => {
    console.log('Prepared to calling');
    setIsPostBoxLoading(true);
    axios({
      method: 'GET',
      url: POST_BOXES_URL,
      timeout: 10000,
      headers: {
        Authorization: Config.AUTHORIZATION_BEARER_TOKEN,
        Accept: 'application/json',
      },
    })
      .then(response => {
        console.log(response, 'RESPONSE');
        setPostBoxes(response.data);
      })
      .catch(error => {
        console.log('Error', error);
        setPostBoxError(error.message);
      })
      .finally(() => {
        console.log('Prepared to called');
        setIsPostBoxLoading(false);
      });
  }, []);

  return {postBoxes, isPostBoxLoading, postBoxError};
}
