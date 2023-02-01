import './styles/reset.css';
import './styles/styles.css';
import initView from './modules/display-base';
import initGame from './modules/controller';
import setFavicon from './modules/display-favicon';

setFavicon();
initView();
initGame();
