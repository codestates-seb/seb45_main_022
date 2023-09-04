import { useState } from 'react';
import Backdrop from '../common/Backdrop';
import LoginSection from './LoginSection';
import RegisterSection from './RegisterSection';

interface Props {
  onLoginBtnClick: () => void;
}

enum Section {
  LOGIN,
  REGISTER,
}

const AuthScreen = ({ onLoginBtnClick }: Props) => {
  const [section, setSection] = useState<Section>(Section.LOGIN);
  return (
    <Backdrop>
      <div className="flex justify-center items-evenly ">
        {section === Section.LOGIN && (
          <LoginSection
            changeSection={() => {
              setSection(Section.REGISTER);
            }}
            onLoginBtnClick={onLoginBtnClick}
          />
        )}
        {section === Section.REGISTER && (
          <RegisterSection
            changeSection={() => {
              setSection(Section.LOGIN);
            }}
          />
        )}
      </div>
    </Backdrop>
  );
};

export default AuthScreen;
