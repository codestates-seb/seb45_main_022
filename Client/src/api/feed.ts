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

export const getUserFeed = async (feedId: Feed['feedId']) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_BASE_URL}feed/${feedId}`,
    );
    return response;
  } catch (error) {
    console.log("Cannot GET user's feed due to error", error);
  }
};
