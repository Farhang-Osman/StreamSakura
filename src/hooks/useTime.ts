export function getCurrentSeason() {
  const month = new Date().getMonth();

  if (month >= 2 && month <= 4) {
    return 'SPRING';
  } else if (month >= 5 && month <= 7) {
    return 'SUMMER';
  } else if (month >= 8 && month <= 10) {
    return 'FALL';
  } else {
    return 'WINTER';
  }
}

export function getNextSeason() {
  const currentSeason = getCurrentSeason();
  switch (currentSeason) {
    case 'SPRING':
      return 'SUMMER';
    case 'SUMMER':
      return 'FALL';
    case 'FALL':
      return 'WINTER';
    case 'WINTER':
      return 'SPRING';

    default:
      return 'UNKNOWN'; // should never be reached
  }
}
