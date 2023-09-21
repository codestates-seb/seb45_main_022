import LoadingBar from '../components/common/LoadingBar';
import Backdrop from '../components/common/Backdrop';

const KakaoAuthPage = async () => {
  return (
    <Backdrop>
      <LoadingBar />
    </Backdrop>
  );
};

export default KakaoAuthPage;
