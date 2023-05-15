const STORAGE_KEY = 'user-color-scheme';

const userToggle = document.querySelector('.user-toggle');
const modeToggleButton = document.querySelector('.js-mode-toggle');
const pcbLayer = document.querySelector('.pcb-layer');

// Hide user toggle on touch devices
if (window.matchMedia('(hover: none), (pointer: coarse)').matches) {
  userToggle.hidden = true;
  userToggle.ariaHidden = true;
}

const applySetting = (passedSetting) => {
  let currentSetting = passedSetting || localStorage.getItem(STORAGE_KEY);

  if (currentSetting) {
    document.documentElement.setAttribute('data-color-theme', currentSetting);
    setButtonLabelAndStatus(currentSetting);
  } else {
    setButtonLabelAndStatus('light');
  }
};

const setButtonLabelAndStatus = (currentSetting) => {
  modeToggleButton.setAttribute(
    'aria-checked',
    `${currentSetting === 'dark' ? true : false}`
  );
  if (currentSetting === 'dark') {
    pcbLayer.classList.add('is-active');
  } else {
    pcbLayer.classList.remove('is-active');
  }
};

const toggleSetting = () => {
  let currentSetting = localStorage.getItem(STORAGE_KEY);

  switch (currentSetting) {
    case null:
      currentSetting = 'dark';
      break;
    case 'light':
      currentSetting = 'dark';
      break;
    case 'dark':
      currentSetting = 'light';
      break;
  }

  localStorage.setItem(STORAGE_KEY, currentSetting);

  return currentSetting;
};

modeToggleButton.addEventListener('click', (evt) => {
  evt.preventDefault();

  applySetting(toggleSetting());
});

applySetting();
