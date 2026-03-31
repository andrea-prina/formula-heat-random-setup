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

const getRandomElements = (arr, n) => shuffleArray(arr).slice(0, n);

function processCornersModifiers(cornersNum) {
  const CORNER_MODIFIERS = [
    "Extra Heat",
    "Speed +1",
    "Speed +1",
    "Speed -1",
    "Speed -1",
    "Extra Heat",
  ];

  const pressCornersNum = getRandomIntFromZeroToMax(2);
  const plainCornersNum = getRandomIntFromZeroToMax(1);

  const remaining = Math.max(0, cornersNum - pressCornersNum - plainCornersNum);

  let selected = [...getRandomElements(CORNER_MODIFIERS, remaining)];

  for (let i = 0; i < pressCornersNum; i++) {
    selected.push("Press Corner");
  }

  for (let i = 0; i < plainCornersNum; i++) {
    selected.push("-");
  }

  selected = shuffleArray(selected);

  return selected;
}

function processSectorsModifiers(sectorsNum) {
  const STRAIGHT_MODIFIERS = [
    "Weather Effect", // Just one as a weather effect is always present
    "Slipstream +1",
    "Slipstream +1",
    "Free Boost",
    "Free Boost",
  ];

  const plainStraightsNum = getRandomIntFromZeroToMax(2);
  const requiredWeatherEffectsNum = 1;

  const remaining = Math.max(
    0,
    sectorsNum - plainStraightsNum - requiredWeatherEffectsNum,
  );

  let selected = [
    ...getRandomElements(STRAIGHT_MODIFIERS, remaining),
    "Weather Effect",
  ];

  for (let i = 0; i < plainStraightsNum; i++) {
    selected.push("-");
  }

  selected = shuffleArray(selected);

  return selected;
}

const trackList = [
  "Japan",
  "Mexico",
  "Great Britain",
  "France",
  "Netherlands",
  "Spain",
  "Italy",
  "USA",
];

function getTrackModifiers(track) {
  const trackDetails = {
    Japan: { cornersNum: 4, sectorsNum: 4 },
    Mexico: { cornersNum: 4, sectorsNum: 4 },
    "Great Britain": { cornersNum: 5, sectorsNum: 5 },
    France: { cornersNum: 5, sectorsNum: 5 },
    Netherlands: { cornersNum: 4, sectorsNum: 4 },
    Spain: { cornersNum: 9, sectorsNum: 9 },
    Italy: { cornersNum: 3, sectorsNum: 3 },
    USA: { cornersNum: 4, sectorsNum: 4 },
  };

  const { cornersNum, sectorsNum } = trackDetails[track];
  const trackModifiers = { corners: undefined, straights: undefined };
  trackModifiers.corners = processCornersModifiers(cornersNum);
  trackModifiers.straights = processSectorsModifiers(sectorsNum);

  return trackModifiers;
}
