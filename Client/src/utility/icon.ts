import ballgameIcon from '../assets/icons/ballgame.png';
import beautyIcon from '../assets/icons/beauty.png';
import climbingIcon from '../assets/icons/climbing.png';
import cookingIcon from '../assets/icons/cooking.png';
import esportsIcon from '../assets/icons/esports.png';
import interiorIcon from '../assets/icons/interior.png';
import itIcon from '../assets/icons/it.png';
import joggingIcon from '../assets/icons/jogging.png';
import musicIcon from '../assets/icons/music.png';
import readingIcon from '../assets/icons/reading.png';
import CharmIcon from '../assets/icons/status-charm.png';
import intelligenceIcon from '../assets/icons/status-intelligence.png';
import livingIcon from '../assets/icons/status-living.png';
import speedIcon from '../assets/icons/status-speed.png';
import strengthIcon from '../assets/icons/status-strength.png';
import studyIcon from '../assets/icons/study.png';
import travelIcon from '../assets/icons/travel.png';
import weightIcon from '../assets/icons/weight.png';
import { CategoryCode, StatusCode } from '../api/category';

export const STATUS_ICON: Record<StatusCode, string> = {
  [StatusCode.STR]: strengthIcon,
  [StatusCode.DEX]: speedIcon,
  [StatusCode.INT]: intelligenceIcon,
  [StatusCode.CHARM]: CharmIcon,
  [StatusCode.LIVING]: livingIcon,
};

export const CATEGORY_ICON: Record<CategoryCode, string> = {
  [CategoryCode.WEIGHT]: weightIcon,
  [CategoryCode.CLIMBING]: climbingIcon,
  [CategoryCode.BALLGAME]: ballgameIcon,
  [CategoryCode.ESPORTS]: esportsIcon,
  [CategoryCode.JOGGING]: joggingIcon,
  [CategoryCode.READING]: readingIcon,
  [CategoryCode.STUDY]: studyIcon,
  [CategoryCode.IT]: itIcon,
  [CategoryCode.BEAUTY]: beautyIcon,
  [CategoryCode.MUSIC]: musicIcon,
  [CategoryCode.INTERIOR]: interiorIcon,
  [CategoryCode.TRAVEL]: travelIcon,
  [CategoryCode.COOKING]: cookingIcon,
};
