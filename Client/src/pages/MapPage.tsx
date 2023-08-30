import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Backdrop from '../components/common/Backdrop';
import ModalFrame from '../components/common/ModalFrame';
import ServerList from '../components/map/ServerList';
import { icons } from '../utility/icon';
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
    const fetchCategoryData = async () => {
      try {
        const response = await axios.get<JsonData>(
          `../../public/categoryList/${statusCode}.json`,
        );
        const jsonData = response.data;

        const selectedCategoryCodes = jsonData.categories.map(
          (category) => category.categoryCode % icons.length,
        );

        const selectedCategoryNames = getSelectedCategoryNames(
          selectedCategoryCodes,
          jsonData.categories,
        );

        console.log(selectedCategoryCodes);
        console.log(selectedCategoryNames);

        setCategoryList(selectedCategoryNames);
        setIconNumbers(selectedCategoryCodes);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCategoryData();
  }, [statusCode]);

  const getSelectedCategoryNames = (
    selectedCategoryCodes: number[],
    categories: Category[],
  ) => {
    return selectedCategoryCodes
      .filter((code) =>
        categories.some((category) => category.categoryCode === code),
      )
      .map((code) => {
        const selectedCategory = categories.find(
          (category) => category.categoryCode === code,
        );
        return selectedCategory ? selectedCategory.categoryName : '';
      });
  };

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
