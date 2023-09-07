import { useState } from 'react';
import Backdrop from '../common/Backdrop';
import Button from '../common/Button';
import ModalFrame from '../common/ModalFrame';
import { StatusCode } from '../../api/category';
import { STATUS_ICON } from '../../utility/status';
import { Link } from 'react-router-dom';

const CheckInScreen = () => {
  const [step, setStep] = useState<'select' | 'confirm'>('select');
  const [selectedStatusCode, setSelectedStatusCode] =
    useState<StatusCode | null>(null);

  const statusCodes = [
    StatusCode.STR,
    StatusCode.DEX,
    StatusCode.INT,
    StatusCode.CHARM,
    StatusCode.LIVING,
  ];
  return (
    <Backdrop>
      <div className="relative w-full h-full flex flex-col justify-center items-center">
        <ModalFrame width={800} height={550}>
          {step === 'select' && (
            <div className="flex flex-col justify-center items-center gap-10">
              <div className="flex flex-col justify-center items-center">
                <h1 className="text-[2rem]">Check-In Reward</h1>
                <p className="font-[Pretendard] text-[1.2rem] font-extrabold">
                  성장시킬 스테이터스를 선택해주세요!
                </p>
              </div>
              <div className="flex flex-row justify-center items-center gap-5">
                {statusCodes.map((statusCode, i) => (
                  <div
                    className="w-[100px] h-[100px] p-5 flex justify-center items-center bg-[#a99886] cursor-pointer rounded-md duration-300 hover:scale-110 hover:brightness-125 hover:shadow-[0_0_10px_#000]"
                    onClick={() => {
                      setSelectedStatusCode(statusCode);
                      setStep('confirm');
                    }}
                    key={i}
                  >
                    <img
                      className="w-full h-full"
                      src={STATUS_ICON[statusCode]}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          {step === 'confirm' && (
            <div className="flex flex-col h-[500px] justify-evenly items-center">
              <div className="flex flex-col justify-center items-center gap-3">
                <div className="w-[150px] h-[150px] p-5 flex items-center bg-[#f6dbbe] rounded-full shadow-[0_0_10px_#000]">
                  <img
                    className="w-full h-full"
                    src={STATUS_ICON[selectedStatusCode as StatusCode]}
                  />
                </div>
                <h1 className="text-[2rem]">Status EXP Up!</h1>
              </div>
              <Link to="/main">
                <Button>Confirm</Button>
              </Link>
            </div>
          )}
        </ModalFrame>
      </div>
    </Backdrop>
  );
};

export default CheckInScreen;
