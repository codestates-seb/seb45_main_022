import axios from 'axios';

export interface Status {
  statName: string;
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

export const getUserStatus = async (): Promise<Status[]> => {
  const res = await axios.get('user/test.json');
  return res.data.statuses;
};
