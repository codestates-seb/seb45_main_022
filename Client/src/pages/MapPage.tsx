import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Backdrop from '../components/common/Backdrop';
import ModalFrame from '../components/common/ModalFrame';
import ServerList from '../components/map/ServerList';
import { getCategoryList } from '../api/category';

const MapPage = () => {
  const [categoryList, setCategoryList] = useState<string[]>([]);
  const [iconNumbers, setIconNumbers] = useState<number[]>([]);
  const { statusCodeParam } = useParams();
  const statusCode = Number(statusCodeParam);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const codes: number[] = [];
        const names: string[] = [];
        const categoryList = await getCategoryList(statusCode);
        categoryList.categories.forEach((category) => {
          const { categoryCode, categoryName } = category;
          codes.push(categoryCode);
          names.push(categoryName);
        });
        setCategoryList(names);
        setIconNumbers(codes);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCategoryData();
  }, [statusCode]);

  return (
    <div className="flex justify-center items-center w-full h-full absolute bg-map bg-center bg-cover">
      <Backdrop>
        <ModalFrame width={1020} height={680}>
          <div className="w-[800px] h-[80px] flex justify-center items-center text-4xl mb-4">
            Servers
          </div>
          <div className="w-full h-px bg-gray-600"></div>
          <div className="w-[800px] h-[480px] flex flex-col  justify-around items-center p-10 gap-4 ">
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
