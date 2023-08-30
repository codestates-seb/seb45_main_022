//MapPage.tsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Backdrop from '../components/common/Backdrop';
import ModalFrame from '../components/common/ModalFrame';
import ServerList from '../components/map/ServerList';
import axios from 'axios';

interface Category {
  categoryCode: number;
  categoryName: string;
}

interface JsonData {
  statusCode: number;
  statusName: string;
  categories: Category[];
}

const MapPage = () => {
  const [categoryList, setCategoryList] = useState<string[]>([]);
  const [iconNumbers, setIconNumbers] = useState<number[]>([]);
  const { statusCode } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<JsonData>(
          `../../public/categoryList/${statusCode}.json`,
        );
        const jsonData = await response.data;

        const selectedCategoryCodes = jsonData.categories.map(
          (category) => category.categoryCode,
        );

        const selectedCategoryNames = selectedCategoryCodes
          .filter((code) =>
            jsonData.categories.some(
              (category) => category.categoryCode === code,
            ),
          )
          .map((code) => {
            const selectedCategory = jsonData.categories.find(
              (category) => category.categoryCode === code,
            );

            return selectedCategory ? selectedCategory.categoryName : '';
          });

        const selectedIconNumbers = selectedCategoryCodes.map(
          (code) => code % 13, // 각각의 카테고리에 대한 끝자리 추출
        );

        setCategoryList(selectedCategoryNames);
        setIconNumbers(selectedIconNumbers);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [statusCode]);

  return (
    <div className="flex justify-center items-center w-full h-full absolute bg-map bg-center bg-cover">
      <Backdrop>
        <ModalFrame width={1020} height={680}>
          <div className="w-[800px] h-[80px] flex justify-center items-center text-4xl mb-4">
            Servers
          </div>
          <div className="w-full h-px bg-gray-600"></div>
          <div className="w-[800px] h-[480px] flex flex-col justify-around items-center p-10 gap-4">
            {categoryList.map((categoryName, index) => (
              <ServerList
                key={index}
                title={categoryName}
                categoryCode={iconNumbers[index]}
              />
            ))}
          </div>
        </ModalFrame>
      </Backdrop>
    </div>
  );
};

export default MapPage;
