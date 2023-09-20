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
  STR = 1,
  DEX = 2,
  INT = 3,
  CHARM = 4,
  LIVING = 5,
}

export enum CategoryCode {
  WEIGHT = 1,
  CLIMBING = 2,
  BALLGAME = 3,
  ESPORTS = 4,
  JOGGING = 5,
  READING = 6,
  STUDY = 7,
  IT = 8,
  BEAUTY = 9,
  MUSIC = 10,
  INTERIOR = 11,
  TRAVEL = 12,
  COOKING = 13,
}

export const getCategoryList = async (statusCode: StatusCode) => {
  const response = await axios.get<CategoryApiData>(
    `/categoryList/${statusCode}.json`,
  );
  const categoryList = response.data;

  return categoryList;
};
