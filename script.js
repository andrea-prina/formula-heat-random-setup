// Uses trackList and getTrackModifiers from get-random-modifiers.js
// get-random-modifiers.js includes:
//   const trackList = ['japan', 'mexico', 'greatbritain', 'france'];
//   function getTrackModifiers(track) { ... }

const trackSelect = document.getElementById("trackSelect");
const cornersList = document.getElementById("cornersList");
const straightsList = document.getElementById("straightsList");
const modifiersSection = document.getElementById("modifiersSection");
const emptyMessage = document.getElementById("emptyMessage");

function buildDropdown() {
  const placeholder = document.createElement("option");
  placeholder.disabled = true;
  placeholder.selected = true;
  placeholder.value = "";
  placeholder.textContent = "-- Select a track --";
  trackSelect.appendChild(placeholder);

  trackList.forEach(name => {
    const option = document.createElement("option");
    option.value = name;
    option.textContent = name;
    trackSelect.appendChild(option);
  });
}

function renderModifiers(trackName) {
  const modifiers = getTrackModifiers(trackName);

  cornersList.innerHTML = "";
  straightsList.innerHTML = "";

  if (!modifiers.corners.length && !modifiers.straights.length) {
    modifiersSection.hidden = true;
    emptyMessage.textContent = "No modifiers available for this track.";
    emptyMessage.hidden = false;
    return;
  }

  modifiers.corners.forEach((corner, index) => {
    const item = document.createElement("li");
    item.textContent = `Curva ${index + 1}: ${corner}`;
    cornersList.appendChild(item);
  });

  modifiers.straights.forEach((straight, index) => {
    const item = document.createElement("li");
    item.textContent = `Rettilineo ${index + 1}: ${straight}`;
    straightsList.appendChild(item);
  });

  modifiersSection.hidden = false;
  emptyMessage.hidden = true;
}

trackSelect.addEventListener("change", event => {
  const trackName = event.target.value;
  if (!trackName) return;
  renderModifiers(trackName);
});

buildDropdown();
