import axios from 'axios';

interface Category {
  categoryCode: number;
  categoryName: string;
}

interface CategoryApiData {
  statusCode: number;
  statusName: string;
  categories: Category[];
}

export enum StatusCode {
  STR = 0,
  DEX = 1,
  INT = 2,
  CHARM = 3,
  LIVING = 4,
}

export enum CategoryCode {
  WEIGHT = 0,
  CLIMBING = 1,
  BALLGAME = 2,
  ESPORTS = 3,
  JOGGING = 4,
  READING = 5,
  STUDY = 6,
  IT = 7,
  BEAUTY = 8,
  MUSIC = 9,
  INTERIOR = 10,
  TRAVEL = 11,
  COOKING = 12,
}

export const getCategoryList = async (statusCode: StatusCode) => {
  const response = await axios.get<CategoryApiData>(
    `/categoryList/${statusCode}.json`,
  );
  const categoryList = response.data;

  return categoryList;
};
