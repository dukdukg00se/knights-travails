import './styles/reset.css';
import './styles/styles.css';
import knight from './assets/images/chess-knight.svg';
import initView from './modules/display-base';
import initGame from './modules/controller';
import setFavicon from './modules/display-favicon';

setFavicon(knight);
initView();
initGame();
