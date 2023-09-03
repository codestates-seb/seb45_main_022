import Backdrop from '../components/common/Backdrop';
import Header from '../components/feed/Header';
import board from '../assets/feed/board.png';
import Main from '../components/feed/Main';

const FeedPage = () => {
  const sectionStyle = {
    backgroundImage: `url(${board})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen bg-feed bg-center bg-cover">
      <Backdrop>
        <div className=" w-[1080px] h-[720px] p-[42px]" style={sectionStyle}>
          <Header />
          <Main />
        </div>
      </Backdrop>
    </div>
  );
};

export default FeedPage;
