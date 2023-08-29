import { useState } from 'react';
import TitleScreen from '../components/title-page/TitleScreen';

const TitlePage = () => {
  const [step, setStep] = useState(0);
  return (
    <>
      <div className="w-full h-screen flex justify-center items-center bg-[#3c0033] z-10">
        <div
          className="bg-title w-[1200px] h-[720px] bg-cover
        bg-no-repeat bg-center"
        >
          {step === 0 && (
            <TitleScreen
              onClick={() => {
                setStep(1);
              }}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default TitlePage;
