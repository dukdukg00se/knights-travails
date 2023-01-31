function isPathDisplayed() {
  const startSq = document.querySelector('.start');

  if (startSq) {
    return !!startSq.lastChild.textContent;
  }
  return false;
}

function getRandomCoord() {
  const squares = document.querySelectorAll('.square');
  const randomNmbr = Math.floor(Math.random() * 64);
  const selected = squares[randomNmbr];
  const randomSquareCoord = selected.dataset.coord;

  // Return string of square coordinates
  return randomSquareCoord;
}

function getDOMSq(input) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mvString = JSON.stringify(input).replace(',', ', ');
      const square = document.querySelector(`[data-coord="${mvString}"]`);

      resolve(square);
    }, 800);
  });
}

export { isPathDisplayed, getRandomCoord, getDOMSq };
