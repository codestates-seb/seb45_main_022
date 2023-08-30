import { useEffect, useState } from 'react';
import Backdrop from '../common/Backdrop';
import Button from '../common/Button';
import axios from 'axios';

interface Props {
  onClick?: () => void;
}

interface Status {
  statName: string;
  statLevel: number;
  statExp: number;
  requiredExp: number;
}

const StatusScreen = ({ onClick }: Props) => {
  const [status, setStatus] = useState<null | Array<Status>>(null);
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get('user/test.json');
        setStatus(res.data.statuses);
        console.log(res.data.statuses);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  return (
    <Backdrop>
      <div className="relative w-full h-full flex flex-col justify-center items-center gap-[2rem]">
        <div className="w-[1200px] h-[600px] bg-[url('/src/assets/common/modal-frame-note.png')] bg-center bg-cover bg-no-repeat flex flex-row">
          <div className="w-[600px] h-[600px]"></div>
          <div className="w-[600px] h-[600px] flex flex-col justify-center items-center"></div>
        </div>
        <Button onClick={onClick}>Close</Button>
      </div>
    </Backdrop>
  );
};

export default StatusScreen;
