import axios from '../utility/axios';
import { UsePostProps } from '../hooks/usePost';
import { convertEncodedImageToFile } from '../utility/image';

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

export const uploadImage = async (encodedImage: string): Promise<string> => {
  const file = await convertEncodedImageToFile(encodedImage, 'image.png');
  const formData = new FormData();
  formData.append('image', file);
  const res = await axios.post('image/upload', formData);
  return res.data.imageURL;
};
