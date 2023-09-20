import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <Link to="/">
      <div className="w-screen h-screen bg-notFoundPage bg-cover bg-center bg-no-repeat flex justify-center items-end cursor-pointer text-white">
        <div className="flex flex-col justify-center items-center mb-[15px]">
          <span>How.. did you get there..?</span>
          <span>Click anywhere & come back home.</span>
        </div>
      </div>
    </Link>
  );
};

export default NotFoundPage;
