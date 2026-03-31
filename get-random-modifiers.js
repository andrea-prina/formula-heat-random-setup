// random integer between 0 and max (inclusive)
const getRandomIntFromZeroToMax = (max) =>
  Math.floor(Math.random() * (max + 1));

// Fisher–Yates shuffle
const shuffleArray = (arr) => {
  const copy = [...arr];

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
};

const getRandomElements = (arr, n) =>
  shuffleArray(arr).slice(0, n);

function processCornersModifiers(cornersNum) {
  const CORNER_MODIFIERS = [
    'heat',
    'corner+1',
    'corner+1',
    'corner-1',
    'corner-1',
    'heat'
  ];

  const pressCornersNum = getRandomIntFromZeroToMax(2);
  const plainCornersNum = getRandomIntFromZeroToMax(1);

  const remaining =
    Math.max(0, cornersNum - pressCornersNum - plainCornersNum);

  let selected = [
    ...getRandomElements(CORNER_MODIFIERS, remaining)
  ];

  for (let i = 0; i < pressCornersNum; i++) {
    selected.push('press');
  }

  for (let i = 0; i < plainCornersNum; i++) {
    selected.push('none');
  }

  selected = shuffleArray(selected);

  return selected;
}

function processStraightsModifiers(straightsNum) {
  const STRAIGHT_MODIFIERS = [
    'weather',
    'slipstream',
    'slipstream',
    'boost',
    'boost',
    'weather'
  ];

  const plainStraightsNum = getRandomIntFromZeroToMax(2);

  const remaining =
    Math.max(0, straightsNum - plainStraightsNum);

  let selected = [
    ...getRandomElements(STRAIGHT_MODIFIERS, remaining)
  ];

  for (let i = 0; i < plainStraightsNum; i++) {
    selected.push('none');
  }

  selected = shuffleArray(selected);

  return selected;
}

const trackList = ['japan', 'mexico', 'greatbritain', 'france']

function getTrackModifiers(track){

    const trackDetails = {
    japan: { cornersNum: 4, straightsNum: 4 },
    mexico: { cornersNum: 4, straightsNum: 4 },
    greatbritain: { cornersNum: 5, straightsNum: 4 },
    france: { cornersNum: 5, straightsNum: 5 }
    };

    const { cornersNum, straightsNum } = trackDetails[track];
    const trackModifiers = {corners: undefined, straights: undefined}
    trackModifiers.corners = processCornersModifiers(cornersNum)
    trackModifiers.straights = processStraightsModifiers(straightsNum)

    return trackModifiers
}