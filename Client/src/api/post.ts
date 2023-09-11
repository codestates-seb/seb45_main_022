import axios from 'axios';
import { UsePostProps } from '../hooks/usePost';

const token = localStorage.getItem('token');

export interface PostData {
  id: number;
  profileImg: string;
  desc: string;
  likes: number;
}

export const getPostInfo = async (): Promise<PostData> => {
  const res = await axios.get('');
  return res.data;
};

export const createPost = async ({
  body,
  data,
  tags,
  categoryCode,
}: UsePostProps) => {
  const response = await axios.post(
    `${import.meta.env.VITE_APP_BASE_URL}feed/${categoryCode}`,
    {
      body,
      data,
      hashTag: tags,
    },
    {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    },
  );
  console.log(response);
  return response;
};
