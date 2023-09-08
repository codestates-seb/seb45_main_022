import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Backdrop from '../components/common/Backdrop';
import ModalFrame from '../components/common/ModalFrame';
import ServerList from '../components/map/ServerList';
import { STATUS_CATEGORY_MAP } from '../utility/status';
import { StatusCode, CategoryCode } from '../api/category';
import { ReturnToMainButton } from '../components/common/BackButton';

const MapPage = () => {
  const [categoryList, setCategoryList] = useState<CategoryCode[]>([]);
  const { statusCodeParam } = useParams<{ statusCodeParam: string }>();
  const statusCode: StatusCode = Number(statusCodeParam);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        setCategoryList(STATUS_CATEGORY_MAP[statusCode]);
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
          <div className="flex w-full h-full relative">
            <div className="mt-[17px] ml-[90px] absolute">
              <ReturnToMainButton />
            </div>
            <div className="w-full h-[80px] flex justify-center items-center text-4xl mb-4">
              Servers
            </div>
          </div>
          <div className="w-full h-px bg-gray-600"></div>
          <div className="w-[800px] h-[480px] flex flex-col justify-around items-center p-10 gap-4">
            {categoryList.map((categoryCode, index) => (
              <ServerList key={index} categoryCode={categoryCode} />
            ))}
          </div>
        </ModalFrame>
      </Backdrop>
    </div>
  );
};

export default MapPage;
