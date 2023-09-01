import { useState } from 'react';
import Backdrop from '../common/Backdrop';
import LoginSection from './LoginSection';
import RegisterSection from './RegisterSection';

interface Props {
  showDefault: () => void;
}

enum Section {
  LOGIN,
  REGISTER,
}

const AuthScreen = ({ showDefault }: Props) => {
  const [section, setSection] = useState<Section>(Section.LOGIN);
  return (
    <Backdrop>
      <div className="flex justify-center items-evenly ">
        {section === Section.LOGIN && (
          <LoginSection
            changeSection={() => {
              setSection(Section.REGISTER);
            }}
            showDefault={showDefault}
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
