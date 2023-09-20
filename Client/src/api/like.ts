import axios from '../utils/axios';

interface Props {
  feedId: number;
}

export const postLike = async ({ feedId }: Props) => {
  const response = await axios.post(
    `${import.meta.env.VITE_APP_BASE_URL}feed/like/${feedId}`,
  );

  return response.data;
};
