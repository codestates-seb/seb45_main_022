import { StatusCode, CategoryCode } from '../api/category';
import CharmIcon from '../assets/icons/status-charm.png';
import intelligenceIcon from '../assets/icons/status-intelligence.png';
import livingIcon from '../assets/icons/status-living.png';
import speedIcon from '../assets/icons/status-speed.png';
import strengthIcon from '../assets/icons/status-strength.png';

export const STATUS_ICON: Record<StatusCode, string> = {
  [StatusCode.STR]: strengthIcon,
  [StatusCode.DEX]: speedIcon,
  [StatusCode.INT]: intelligenceIcon,
  [StatusCode.CHARM]: CharmIcon,
  [StatusCode.LIVING]: livingIcon,
};

export const STATUS_NAME: Record<StatusCode, string> = {
  [StatusCode.STR]: '힘',
  [StatusCode.DEX]: '민첩',
  [StatusCode.INT]: '지능',
  [StatusCode.CHARM]: '매력',
  [StatusCode.LIVING]: '생활력',
};

export const STATUS_CATEGORY_MAP: Record<StatusCode, CategoryCode[]> = {
  [StatusCode.STR]: [CategoryCode.WEIGHT, CategoryCode.CLIMBING],
  [StatusCode.DEX]: [
    CategoryCode.BALLGAME,
    CategoryCode.ESPORTS,
    CategoryCode.JOGGING,
  ],
  [StatusCode.INT]: [CategoryCode.READING, CategoryCode.STUDY, CategoryCode.IT],
  [StatusCode.CHARM]: [CategoryCode.BEAUTY, CategoryCode.MUSIC],
  [StatusCode.LIVING]: [
    CategoryCode.INTERIOR,
    CategoryCode.TRAVEL,
    CategoryCode.COOKING,
  ],
};
