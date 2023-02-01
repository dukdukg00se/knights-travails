import knight from '../assets/images/chess-knight.svg';

function setFavicon() {
  const icon = document.querySelector('link[rel="shortcut icon"]');
  icon.href = knight;
}

export default setFavicon;
