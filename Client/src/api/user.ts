import axios from '../utility/axios';
import { convertEncodedImageToFile } from '../utility/image';
import { StatusCode } from './category';

export interface Status {
  statId: StatusCode;
  statLevel: number;
  statExp: number;
  requiredExp: number;
}

export interface UserInfo {
  id: number;
  email: string;
  nickname: string;
  profileImage: string;
  attendance: boolean;
  statuses: Status[];
}

export const getUserInfo = async (): Promise<UserInfo> => {
  const res = await axios.get('user/mypage');
  return res.data;
};

export const postProfileImage = async (encodedImage: string) => {
  const file = await convertEncodedImageToFile(encodedImage, 'profile.png');
  const formData = new FormData();
  formData.append('imageFile', file);
  const res = await axios.post('user/mypage/edit/image', formData);
  console.log(res);
};

export const postNickname = async (nickname: string): Promise<string> => {
  const res = await axios.patch('user/mypage/edit/nickname', {
    nickname,
  });
  return res.data;
};

export const changePassword = async (password: string): Promise<string> => {
  const res = await axios.patch('user/mypage/edit/password', {
    password,
  });
  return res.data;
};

export const checkAttendace = async (): Promise<boolean> => {
  const res = await axios.get<{ attendance: boolean }>('attendance/check');
  return res.data.attendance;
};

export const postAttendance = async (StatusCode: StatusCode) => {
  const res = await axios.post(`attendance/${StatusCode}`);
  return res.data;
};
