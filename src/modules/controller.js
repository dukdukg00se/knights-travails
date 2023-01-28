import { randomCoord, logUserCoord, clearData } from './data-handlers';
import { clearBoard, hlActiveBtn, showPath } from './display';

function clearGame() {
  clearBoard();
  clearData();
  logUserCoord(false);
}

function isPathDisplayed() {
  const startSq = document.querySelector('.start');

  if (startSq) {
    return !!startSq.lastChild.textContent;
  }
  return false;
}

function managebtn(e) {
  const btn = e.target;
  const prevbtn = document.querySelector('.active');

  // if (isPathDisplayed()) {
  //   clearGame();
  // }

  hlActiveBtn(btn, prevbtn);

  if (btn.id === 'start') {
    if (isPathDisplayed()) {
      clearGame();
    }

    logUserCoord(e);
  }

  if (btn.id === 'random-start') {
    logUserCoord(e);

    const needReset = isPathDisplayed();
    if (needReset) {
      clearGame();
    }

    const startString = randomCoord(); // fn returns string data
    start = JSON.parse(startString);

    const square = document.querySelector(`[data-coord="${startString}"]`);

    const prevSq = document.querySelector('.start');
    if (prevSq) {
      if (prevSq.dataset.coord !== square.dataset.coord) {
        prevSq.classList.remove('start');
        prevSq.firstChild.style.opacity = '0';
      }
    }

    square.firstChild.style.opacity = '1';
    square.classList.add('start');
  }

  if (btn.id === 'end') {
    const needReset = isPathDisplayed();
    if (needReset) {
      clearGame();
    }

    logUserCoord(e);
  }

  if (btn.id === 'random-end') {
    logUserCoord(e);

    const needReset = isPathDisplayed();
    if (needReset) {
      clearGame();
    }

    const endString = randomCoord(); // fn returns string data
    end = JSON.parse(endString);

    const square = document.querySelector(`[data-coord="${endString}"]`);

    const prevSq = document.querySelector('.end');
    if (prevSq) {
      if (prevSq.dataset.coord !== square.dataset.coord) {
        prevSq.classList.remove('end');
      }
    }

    square.classList.add('end');
  }

  if (btn.id === 'travail') {
    // showPath();

    if (start && end) {
      if (isPathDisplayed()) {
        return;
      }
      showPath();
      logUserCoord(false);
    } else if (!start) {
      alert('Select a start position');
    } else if (!end) {
      alert('Select an end position');
    }
  }

  if (btn.id === 'clear') {
    clearGame();
  }
}

function initGame() {
  const userBtns = document.querySelectorAll('button');
  userBtns.forEach((btn) => {
    btn.addEventListener('click', managebtn);
  });
}

export { initGame, clearGame };
