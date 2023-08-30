import { useState } from 'react';
import Login from '../components/user/Login';
import Register from '../components/user/Register';

const TitlePage = () => {
  const [stage, setStage] = useState<0 | 1>(0);
  return (
    <div>
      {stage === 0 && <Login setStage={setStage} />}
      {stage === 1 && <Register setStage={setStage} />}
    </div>
  );
};

export default TitlePage;
