import axios from 'axios';
import { CategoryCode } from './category';

const token = localStorage.getItem("token")



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

export interface FeedId {
  feedId: number;
}



export const getFeedList = async (categoryCode: CategoryCode,) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}feed/get/${categoryCode}?page=1&size=10`)
    return response

  } catch (error) {
    console.log('Cannot GET latest posts due to Error', error)
  }
};

// 주간 베스트
export const getWeeklyBest = async (categoryCode: CategoryCode) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_BASE_URL}feed/weeklybest/${categoryCode}?page=1&size=10`)
    return response;

  } catch (error) {
    console.log('Cannot GET weekly best due to Error', error)
  }
}

// 상세 피드 
export const getUserFeed = async (feedId: Feed['feedId']) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}feed/${feedId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response

  } catch (error) {
    console.log("Cannot GET user's feed due to error", error)
  }
}


export const getFilterdFeedList = async (
  categoryCode: CategoryCode,
  keyword: string,
) => {
  const response = await axios.get<FeedApiData>(
    `${import.meta.env.VITE_APP_BASE_URL
    }feed/get/${categoryCode}?page=1&size=10&query=${keyword}`,
  );
  const feedList = response.data.data;
  console.log(categoryCode);

  return feedList;
};

