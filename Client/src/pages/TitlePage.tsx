import TitleScreen from '../components/title/TitleScreen';

const TitlePage = () => {
  return (
    <>
      <div className="w-full min-w-[1200px] h-screen flex justify-center items-center bg-[#3c0033] overflow-y-hidden">
        <div
          className="relative bg-title w-[1200px] h-[720px] bg-cover
        bg-no-repeat bg-center"
        >
          <TitleScreen />
        </div>
      </div>
    </>
  );
};

export default TitlePage;
