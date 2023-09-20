import axios from '../utils/axios';
import { CategoryCode } from './category';

export interface CategoryCodeParams {
  categoryCode: CategoryCode;
}

export interface HashTag {
  hashTagId: number;
  body: string;
}
export interface Feed {
  feedId: number;
  nickname: string;
  profileImage: string;
  statId: number;
  level: number;
  body: string;
  statName: string;
  feedHashTags: HashTag[];
  like: boolean;
  likeCount: number;
  commentCount: number;
  createdAt: string;
  modifiedAt: string;
}

interface FeedApiData {
  data: Feed[];
  pageInfo: {
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
  };
}

export type FeedFilterType = 'latest' | 'weekly';
export type FeedSearchType = 'content' | 'user' | 'hashTag';
export type FeedListType = FeedFilterType | FeedSearchType;

interface GetFeedListParams {
  categoryCode: CategoryCode;
  page: number;
  type: FeedListType;
  keyword?: string;
}

export const getFeedList = async ({
  categoryCode,
  page,
  type,
  keyword,
}: GetFeedListParams) => {
  const API_URL: Record<FeedListType, string> = {
    latest: `feed/get/${categoryCode}?page=${page}&size=10`,
    weekly: `feed/weeklybest/${categoryCode}?page=${page}&size=10`,
    content: `feed/find/body/${categoryCode}?page=${page}&size=10&query=${keyword}`,
    user: `feed/find/user/${categoryCode}?page=${page}&size=10&query=${keyword}`,
    hashTag: `feed/find/hashTag/${categoryCode}?page=${page}&size=10&body=${keyword}`,
  };

  const response = await axios.get<FeedApiData>(API_URL[type]);
  return response.data;
};

export const getOtherUserFeedList = async ({
  categoryCode,
}: CategoryCodeParams) => {
  const response = await axios.get(`feed/get/${categoryCode}?page=1&size=10`);

  return response.data.data;
};

export interface FeedDetail {
  feedId: number;
  nickname: string;
  profileImage: string;
  statId: number;
  level: number;
  data: string;
  feedHashTags: HashTag[];
  like: boolean;
  likeCount: number;
  createdAt: string;
  modifiedAt: string;
}

export const getFeedDetail = async (feedId: Feed['feedId']) => {
  const response = await axios.get<FeedDetail>(
    `${import.meta.env.VITE_APP_BASE_URL}feed/${feedId}`,
  );
  return response.data;
};

export interface PostFeedData {
  body: string;
  data: string;
  tags: string[];
  categoryCode: CategoryCode;
}

export const postFeed = async ({
  body,
  data,
  tags,
  categoryCode,
}: PostFeedData) => {
  const response = await axios.post(
    `${import.meta.env.VITE_APP_BASE_URL}feed/${categoryCode}`,
    {
      body,
      data,
      hashTag: tags,
    },
  );
  return response;
};

export const patchFeed = async ({
  feedId,
  data,
  body,
}: {
  feedId: number;
  body: string;
  data: string;
}) => {
  const response = await axios.patch(`/feed/${feedId}`, {
    data,
    body,
  });
  console.log(response);
  return response.data;
};

export const deleteFeed = async ({ feedId }: { feedId: number }) => {
  const response = await axios.delete(`/feed/${feedId}`);
  return response.data;
};
