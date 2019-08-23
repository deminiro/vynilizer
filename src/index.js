import { Howl } from 'howler';
import './style.css';

const btnSwitchOn = document.getElementById('btn-switch-on');
const vinilPlate = document.getElementById('vinil-plate');
const timeOfSound = document.getElementById('time-of-sound');
const containerWithPlates = document.getElementById('container-with-plates');
let sound;

const makeSound = (soundId) => {
  let stateSound = 'stop';
  let degreesForTwist = 0;
  let soundDurationLeft = 0;
  let soundDuration = 0;
  let minutes = 0;
  let twist;

  if (soundId === 'vinil-plate-hype') {
    sound = new Howl({
      src: ['../src/assets/twenty-one-pilots-the-hype.mp3'],
      autoplay: false,
      volume: 0.1,
    });
  } else if (soundId === 'vinil-plate-doubt') {
    sound = new Howl({
      src: ['../src/assets/twenty-one-pilots-doubt.mp3'],
      autoplay: false,
      volume: 0.1,
    });
  } else if (soundId === 'vinil-plate-polarize') {
    sound = new Howl({
      src: ['../src/assets/twenty-one-pilots-polarize.mp3'],
      autoplay: false,
      volume: 0.1,
    });
  } else if (soundId === 'vinil-plate-bandito') {
    sound = new Howl({
      src: ['../src/assets/twenty-one-pilots-bandito.mp3'],
      autoplay: false,
      volume: 0.1,
    });
  }

  function soundPlay() {
    sound.play();
    stateSound = 'play';
  }

  function soundStop() {
    sound.pause();
    stateSound = 'stop';
    clearInterval(twist);
  }

  function resetSound() {
    clearInterval(twist);
    stateSound = 'stop';
    soundDurationLeft = 0;
    soundDuration = 0;
    minutes = 0;
  }

  function clearInterv(event) {
    if (event.target.id.indexOf('vinil-plate-') !== -1) {
      clearInterval(twist);
    }
  }

  const actionForPlate = (event) => {
    event.preventDefault();
    if (sound !== undefined) {
      if (stateSound === 'stop') {
        soundPlay();
        twist = setInterval(() => {
          vinilPlate.style.transform = `rotate(${degreesForTwist}deg)`;
          degreesForTwist += 3;
          soundDurationLeft += 0.05;
          soundDuration += 0.05;
          timeOfSound.innerHTML = `${minutes}:${soundDurationLeft.toFixed(3)}`;
          if (soundDurationLeft >= 60) {
            minutes += 1;
            soundDurationLeft = 0;
          }
          if (soundDuration >= sound.duration() && sound.duration() !== 0) resetSound();
        }, 50);
      } else if (stateSound === 'reset') stateSound = 'stop';
      else if (stateSound === 'play') soundStop();
    }
  };

  btnSwitchOn.addEventListener('click', actionForPlate);
  containerWithPlates.addEventListener('click', clearInterv);
};

const chooseSound = (event) => {
  if (event.target.id.indexOf('vinil-plate-') !== -1) {
    event.preventDefault();
    vinilPlate.style.opacity = '1';
    if (sound !== undefined) sound.stop();
    makeSound(event.target.id);
  }
};

containerWithPlates.addEventListener('click', chooseSound);
