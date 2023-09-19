import TitleScreen from '../components/title/TitleScreen';

const TitlePage = () => {
  return (
    <>
      <div className="w-full h-screen flex justify-center items-center bg-[#3c0033] z-10">
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
