import ModalFrame from '../components/common/ModalFrame';
import { ServerList } from '../components/map/ServerList';

const MapPage = () => {
  return (
    <div className="flex justify-center items-center w-full h-full absolute bg-map bg-center bg-cover">
      <ModalFrame width={1020} height={680}>
        <div className="w-[800px] h-[80px] flex justify-center items-center text-4xl mb-4">
          Servers
        </div>
        <div className="w-full h-px bg-gray-600"></div>
        <div className="w-[800px] h-[480px] flex flex-col justify-around items-center p-10 gap-4">
          <ServerList title="Weight Training" numberOfPosts="5 posts" />
          <ServerList title="Running" numberOfPosts="3 posts" />
        </div>
      </ModalFrame>
    </div>
  );
};

export default MapPage;
