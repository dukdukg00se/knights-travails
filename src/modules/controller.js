import { logUserCoord, clearData } from './data-handlers';
import { clearBoard, panelHl, showPath } from './display';

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

  panelHl(btn);

  if (btn.id === 'travail') {
    // if (start && end) {
    //   if (isPathDisplayed()) {
    //     return;
    //   }
    //   showPath();
    //   // logUserCoord(false);
    // }
  } else if (btn.id === 'clear') {
    clearGame();
  } else {
    if (isPathDisplayed()) {
      clearGame();
    }

    logUserCoord(e);
  }

  // if (btn.id === 'start') {
  //   if (isPathDisplayed()) {
  //     clearGame();
  //   }

  //   logUserCoord(e);
  // }

  // if (btn.id === 'random-start') {
  //   const needReset = isPathDisplayed();
  //   if (needReset) {
  //     clearGame();
  //   }

  //   logUserCoord(e);
  // }

  // if (btn.id === 'end') {
  //   const needReset = isPathDisplayed();
  //   if (needReset) {
  //     clearGame();
  //   }

  //   logUserCoord(e);
  // }

  // if (btn.id === 'random-end') {
  //   const needReset = isPathDisplayed();
  //   if (needReset) {
  //     clearGame();
  //   }

  //   logUserCoord(e);
  // }

  // if (btn.id === 'travail') {
  //   // showPath();

  //   if (start && end) {
  //     if (isPathDisplayed()) {
  //       return;
  //     }
  //     showPath();
  //     // logUserCoord(false);
  //   } else if (!start) {
  //     alert('Select a start position');
  //   } else if (!end) {
  //     alert('Select an end position');
  //   }
  // }

  // if (btn.id === 'clear') {
  //   clearGame();
  // }
}

function initGame() {
  const userBtns = document.querySelectorAll('button');
  userBtns.forEach((btn) => {
    btn.addEventListener('click', managebtn);
  });
}

export { initGame, clearGame };
