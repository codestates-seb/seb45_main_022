import { useState } from 'react';
import Backdrop from '../common/Backdrop';
import LoginSection from './LoginSection';
import RegisterSection from './RegisterSection';

interface Props {
  closeScreen: () => void;
}

enum Section {
  LOGIN,
  REGISTER,
}

const AuthScreen = ({ closeScreen }: Props) => {
  const [section, setSection] = useState<Section>(Section.LOGIN);
  return (
    <Backdrop>
      <div className="flex justify-center items-evenly ">
        {section === Section.LOGIN && (
          <LoginSection
            changeSection={() => {
              setSection(Section.REGISTER);
            }}
            closeScreen={() => {
              closeScreen();
            }}
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
