import axios from '../utils/axios';
import { convertEncodedImageToFile } from '../utils/image';

export const uploadImage = async (encodedImage: string): Promise<string> => {
  const file = await convertEncodedImageToFile(encodedImage, 'image.png');
  const formData = new FormData();
  formData.append('image', file);
  const res = await axios.post('image/upload', formData);
  return res.data.imageURL;
};
