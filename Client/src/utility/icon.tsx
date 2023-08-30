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

interface IconInfo {
  [categoryCode: number]: string;
}

export const icons: IconInfo = [
  weightIcon,
  climbingIcon,
  ballgameIcon,
  esportsIcon,
  joggingIcon,
  readingIcon,
  studyIcon,
  itIcon,
  beautyIcon,
  musicIcon,
  interiorIcon,
  travelIcon,
  cookingIcon,
];

export const titleIcons: IconInfo = [
  strengthIcon,
  speedIcon,
  intelligenceIcon,
  CharmIcon,
  livingIcon,
];
