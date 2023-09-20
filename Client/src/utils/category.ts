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
import studyIcon from '../assets/icons/study.png';
import travelIcon from '../assets/icons/travel.png';
import weightIcon from '../assets/icons/weight.png';
import { CategoryCode, StatusCode } from '../api/category';

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

export const CATEGORY_NAME: Record<CategoryCode, string> = {
  [CategoryCode.WEIGHT]: '헬스',
  [CategoryCode.CLIMBING]: '등산',
  [CategoryCode.BALLGAME]: '구기종목',
  [CategoryCode.ESPORTS]: 'e스포츠',
  [CategoryCode.JOGGING]: '조깅',
  [CategoryCode.READING]: '독서',
  [CategoryCode.STUDY]: '공부',
  [CategoryCode.IT]: 'IT',
  [CategoryCode.BEAUTY]: '미용',
  [CategoryCode.MUSIC]: '음악',
  [CategoryCode.INTERIOR]: '인테리어',
  [CategoryCode.TRAVEL]: '여행',
  [CategoryCode.COOKING]: '요리',
};

export const CATEGORY_STATUS_MAP: Record<CategoryCode, StatusCode> = {
  [CategoryCode.WEIGHT]: StatusCode.STR,
  [CategoryCode.CLIMBING]: StatusCode.STR,
  [CategoryCode.BALLGAME]: StatusCode.DEX,
  [CategoryCode.ESPORTS]: StatusCode.DEX,
  [CategoryCode.JOGGING]: StatusCode.DEX,
  [CategoryCode.READING]: StatusCode.INT,
  [CategoryCode.STUDY]: StatusCode.INT,
  [CategoryCode.IT]: StatusCode.INT,
  [CategoryCode.BEAUTY]: StatusCode.CHARM,
  [CategoryCode.MUSIC]: StatusCode.CHARM,
  [CategoryCode.INTERIOR]: StatusCode.LIVING,
  [CategoryCode.TRAVEL]: StatusCode.LIVING,
  [CategoryCode.COOKING]: StatusCode.LIVING,
};

export const CATEGORY_FEED_MAP: Record<CategoryCode, string> = {
  [CategoryCode.WEIGHT]: 'bg-strFeed',
  [CategoryCode.CLIMBING]: 'bg-strFeed',
  [CategoryCode.BALLGAME]: 'bg-dexFeed',
  [CategoryCode.ESPORTS]: 'bg-dexFeed',
  [CategoryCode.JOGGING]: 'bg-dexFeed',
  [CategoryCode.READING]: 'bg-intFeed',
  [CategoryCode.STUDY]: 'bg-intFeed',
  [CategoryCode.IT]: 'bg-intFeed',
  [CategoryCode.BEAUTY]: 'bg-charmFeed',
  [CategoryCode.MUSIC]: 'bg-charmFeed',
  [CategoryCode.INTERIOR]: 'bg-livingFeed',
  [CategoryCode.TRAVEL]: 'bg-livingFeed',
  [CategoryCode.COOKING]: 'bg-livingFeed',
};
