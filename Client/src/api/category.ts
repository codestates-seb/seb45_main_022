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

enum StatusCode {
  STR = 0,
  DEX = 1,
  INT = 2,
  CHARM = 3,
  LIVING = 4,
}

export const getCategoryList = async (statusCode: StatusCode) => {
  const response = await axios.get<CategoryApiData>(
    `/categoryList/${statusCode}.json`,
  );
  const categoryList = response.data;

  return categoryList;
};
