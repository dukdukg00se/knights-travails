import { getDOMSq } from './helpers';

function clearBoard() {
  const board = document.querySelector('.checker-board');
  board.onclick = null;
  const squares = document.querySelectorAll('.square');
  squares.forEach((sq) => {
    if (sq.classList.contains('start')) {
      sq.classList.toggle('start');
    }

    if (sq.classList.contains('end')) {
      sq.classList.toggle('end');
    }

    sq.firstChild.style.opacity = '0';
    sq.lastChild.textContent = '';
  });
}

function btnHl(btn) {
  const prevBtn = document.querySelector('.active');

  if (prevBtn && prevBtn.id !== btn.id) {
    prevBtn.classList.remove('active');
  }

  if (btn.id === 'start' || btn.id === 'end') {
    btn.classList.add('active');
  }
}

function boardHl(sq, position) {
  const prevSq = document.querySelector(`.${position}`);

  if (!sq.classList.contains('square')) {
    return;
  }

  if (position === 'start' || position === 'random-start') {
    if (prevSq) {
      prevSq.firstChild.style.opacity = '0';
      prevSq.classList.remove('start');
    }

    sq.firstChild.style.opacity = '1';
    sq.classList.add('start');
  } else if (position === 'end' || position === 'random-end') {
    if (prevSq) {
      prevSq.classList.remove('end');
    }

    sq.classList.add('end');
  }
}

async function showPath(path) {
  for (let i = 0; i < path.length; i += 1) {
    const square = await getDOMSq(path[i]);
    square.classList.add('end');
    square.firstChild.style.opacity = '1';
    square.lastChild.textContent = i;
  }
}

export { clearBoard, btnHl, showPath, boardHl };
