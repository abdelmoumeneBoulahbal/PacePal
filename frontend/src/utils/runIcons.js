
import recoveryIcon from '../assets/icons/medical.png';
import tempoIcon from '../assets/icons/running_17463605 (1).png';
import longRunIcon from '../assets/icons/long-term.png';
import intervalIcon from '../assets/icons/timer.png';
import hillRepeatsIcon from '../assets/icons/hiking_18976183.png';
import fartlekIcon from '../assets/icons/speedometer.png';
import easyRunIcon from '../assets/icons/running-shoes.png';
import trailRunIcon from '../assets/icons/trail.png';
import racePaceIcon from '../assets/icons/marathon.png';
import crossCountryIcon from '../assets/icons/route.png';

import defaultIcon from '';

const runTypeIcons = {
  'Recovery Run': recoveryIcon,
  'Tempo Run': tempoIcon,
  'Long Run': longRunIcon,
  'Interval Training': intervalIcon,
  'Hill Repeats': hillRepeatsIcon,
  'Fartlek': fartlekIcon,
  'Easy Run': easyRunIcon,
  'Trail Run': trailRunIcon,
  'Race Pace': racePaceIcon,
  'Cross Country': crossCountryIcon
};


export const getRunIcon = (runType) => {
    const validRunType = isValidRunType(runType)
    return runTypeIcons[validRunType] || defaultIcon;
};

export const getAllRunTypes = () => {
  return Object.entries(runTypeIcons).map(([name, icon]) => ({
    name,
    icon
  }));
};


export const isValidRunType = (runType) => {
  return runType in runTypeIcons;
};