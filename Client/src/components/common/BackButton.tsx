import { useNavigate } from 'react-router';
import { CategoryCode } from '../../api/category';
import backButton from '../../assets/common/back-button.png';
import { CATEGORY_STATUS_MAP } from '../../utils/category';

interface Props {
  categoryCode: CategoryCode;
}

export function BackButton({ categoryCode }: Props) {
  const nav = useNavigate();

  const handleBackClick = () => {
    if (categoryCode > 1) {
      nav(`/feed/${categoryCode - 1}`);
    }
  };

  return (
    <img
      src={backButton}
      alt="back"
      onClick={handleBackClick}
      width={48}
      height={36}
      className="cursor-pointer"
    />
  );
}

export function FrontButton({ categoryCode }: Props) {
  const nav = useNavigate();

  const handleFrontClick = () => {
    if (categoryCode < Object.keys(CATEGORY_STATUS_MAP).length) {
      nav(`/feed/${categoryCode + 1}`);
    }
  };

  return (
    <img
      src={backButton}
      alt="front"
      onClick={handleFrontClick}
      width={48}
      height={36}
      className="rotate-180 cursor-pointer"
    />
  );
}

export function ReturnToMainButton() {
  const nav = useNavigate();

  return (
    <img
      src={backButton}
      alt="MainButton"
      onClick={() => nav('/main/status')}
      width={48}
      height={36}
      className="cursor-pointer"
    />
  );
}
