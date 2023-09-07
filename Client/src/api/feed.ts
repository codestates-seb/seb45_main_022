import axios from 'axios';
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

export const getFeedList = async (categoryCode: CategoryCode) => {
  const response = await axios.get<FeedApiData>(
    `/feed/feedData${categoryCode}.json`,
  );
  const feedList = response.data.data;

  return feedList;
};

export const getFilterdFeedList = async (
  categoryCode: CategoryCode,
  keyword: string,
) => {
  const response = await axios.get<FeedApiData>(
    `${
      import.meta.env.VITE_APP_BASE_URL
    }/feed/findByBody/${categoryCode}?page=1&size=10&query=${keyword}`,
  );
  const feedList = response.data.data;
  console.log(categoryCode);

  return feedList;
};
