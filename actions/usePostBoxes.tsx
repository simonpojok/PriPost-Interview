import {useEffect, useState} from 'react';
import axios from 'axios';
import Config from '../config';
import PostBox from '../types/PostBox';

const POST_BOXES_URL = `${Config.BASE_URL}/api/admin/v1/pripost/letters/postboxes`;

export default function usePostBoxes() {
  const [postBoxes, setPostBoxes] = useState<Array<PostBox>>([]);
  const [isPostBoxLoading, setIsPostBoxLoading] = useState(false);
  const [postBoxError, setPostBoxError] = useState({});

  useEffect(() => {
    setIsPostBoxLoading(true);
    axios
      .get(POST_BOXES_URL, {
        headers: {
          Authorization: Config.AUTHORIZATION_BEARER_TOKEN,
          Accept: 'application/json',
        },
      })
      .then(response => {
        setPostBoxes(response.data);
      })
      .catch(error => {
        console.log(error);
        setPostBoxError(error.message);
      })
      .finally(() => {
        setIsPostBoxLoading(false);
      });
  }, []);

  return {postBoxes, isPostBoxLoading, postBoxError};
}
