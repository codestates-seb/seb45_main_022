import axios from 'axios';
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
  nickName: string;
  profileImage: string;
  attendance: boolean;
  statuses: Status[];
}

export const getUserInfo = async (): Promise<UserInfo> => {
  const res = await axios.get('user/test.json');
  return res.data;
};
