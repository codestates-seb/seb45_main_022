import axios from '../utility/axios';
import { CategoryCode } from './category';

export interface Feed {
  feedId: number;
  nickName: string;
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

export type FeedListType = 'latest' | 'weekly';

interface GetFeedListParams {
  categoryCode: CategoryCode;
  page: number;
  type: FeedListType;
}

export const getFeedList = async ({
  categoryCode,
  page,
  type,
}: GetFeedListParams) => {
  const API_URL = {
    latest: `feed/get/${categoryCode}?page=${page}&size=10`,
    weekly: `feed/weeklybest/${categoryCode}?page=${page}&size=10`,
  };

  const response = await axios.get<FeedApiData>(API_URL[type]);
  return response.data;
};

export const getFilterdFeedList = async (
  categoryCode: CategoryCode,
  keyword: string,
) => {
  const response = await axios.get<FeedApiData>(
    `${
      import.meta.env.VITE_APP_BASE_URL
    }feed/get/${categoryCode}?page=1&size=10&query=${keyword}`,
  );
  const feedList = response.data.data;
  console.log(categoryCode);

  return feedList;
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
