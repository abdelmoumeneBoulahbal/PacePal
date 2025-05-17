
import recoveryIcon from '../assets/icons/medical.png';
import tempoIcon from '../assets/icons/timer (1).png';
import longRunIcon from '../assets/icons/long-term.png';
import intervalIcon from '../assets/icons/timer.png';
import hillRepeatsIcon from '../assets/icons/hiking_18976183.png';
import fartlekIcon from '../assets/icons/speedometer.png';
import easyRunIcon from '../assets/icons/running-shoes.png';
import trailRunIcon from '../assets/icons/trail (1).png';
import racePaceIcon from '../assets/icons/marathon.png';
import crossCountryIcon from '../assets/icons/route.png';

const runTypeIcons = {
  'Recovery Run': recoveryIcon,
  'Tempo Run': tempoIcon,
  'Long Run': longRunIcon,
  'Interval Training': intervalIcon,
  'Hill Repeats': hillRepeatsIcon,
  'Fartlek Run': fartlekIcon,
  'Easy Run': easyRunIcon,
  'Trail Run': trailRunIcon,
  'Race Pace': racePaceIcon,
  'Cross Country': crossCountryIcon
};


export const getRunIcon = (runType) => {
  // Case-insensitive matching and fallback
  const normalizedRunType = Object.keys(runTypeIcons).find(
    key => key.toLowerCase() === (runType || '').toLowerCase()
  );
  
  return runTypeIcons[normalizedRunType];
};