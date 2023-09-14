import axios from '../utility/axios';
import { CategoryCode } from './category';

export interface Feed {
  feedId: number;
  nickname: string;
  profileImage: string;
  statId: number;
  level: number;
  body: string;
  statName: string;
  feedHashTags: {
    hashTagId: number;
    body: string;
  }[];
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

export interface FeedDetail {
  feedId: number;
  nickname: string;
  profileImage: string;
  statId: number;
  level: number;
  data: string;
  feedHashTags: HashTag[];
  likeCount: number;
  comments: Comment[];
  createdAt: string;
  modifiedAt: string;
}

export interface HashTag {
  hashTagId: number;
  body: string;
}

export interface Comment {
  commentId: number;
  nickname: string;
  profileImage: string;
  level: number;
  body: string;
  createDate: string;
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
  data: string;
  body: string;
}) => {
  const response = await axios.patch(`/feed/${feedId}`, {
    body,
    data,
  });
  console.log(response);
  return response.data;
};

export const deleteFeed = async ({ feedId }: { feedId: number }) => {
  const response = await axios.delete(`/feed/${feedId}`);
  return response.data;
};
