import { useState } from 'react';
import Backdrop from '../common/Backdrop';
import Button from '../common/Button';
import ModalFrame from '../common/ModalFrame';
import { StatusCode } from '../../api/category';
import { STATUS_ICON } from '../../utils/status';
import { Link } from 'react-router-dom';
import { postAttendance } from '../../api/user';
import { useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { ERROR_MSG, ErrorType } from '../../api/error';

const CheckInScreen = () => {
  const [step, setStep] = useState<'select' | 'confirm'>('select');
  const [selectedStatusCode, setSelectedStatusCode] =
    useState<StatusCode | null>(null);

  const queryClient = useQueryClient();

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
            <div className="flex flex-col justify-center items-center gap-[40px]">
              <div className="flex flex-col justify-center items-center">
                <h1 className="text-[2rem]">Check-In Reward</h1>
                <p className="font-[Pretendard] text-[1.2rem] font-extrabold">
                  성장시킬 스테이터스를 선택해주세요!
                </p>
              </div>
              <div className="flex flex-row justify-center items-center gap-[20px]">
                {statusCodes.map((statusCode, i) => (
                  <div
                    className="w-[100px] h-[100px] p-[20px] flex justify-center items-center bg-[#a99886] cursor-pointer rounded-[6px] duration-300 hover:scale-110 hover:brightness-125 hover:shadow-[0_0_10px_#000]"
                    onClick={async () => {
                      setSelectedStatusCode(statusCode);
                      try {
                        await postAttendance(statusCode);
                      } catch (error) {
                        if (axios.isAxiosError<ErrorType>(error)) {
                          const errorCode = error.response?.data.errorCode;
                          if (errorCode) {
                            alert(ERROR_MSG[errorCode]);
                            return;
                          }
                        }
                        alert('서버와의 통신에 실패했습니다.');
                      }
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
              <div className="flex flex-col justify-center items-center gap-[12px]">
                <div className="w-[150px] h-[150px] p-[20px] flex items-center bg-[#f6dbbe] rounded-full shadow-[0_0_10px_#000]">
                  <img
                    className="w-full h-full"
                    src={STATUS_ICON[selectedStatusCode as StatusCode]}
                  />
                </div>
                <h1 className="text-[2rem]">10 EXP UP!</h1>
              </div>
              <Link
                onClick={() => {
                  queryClient.invalidateQueries(['checkIn']);
                  queryClient.invalidateQueries(['userInfo']);
                }}
                to="/main"
              >
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
