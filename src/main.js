import ReactDom from 'react-dom';
import React from 'react';
import MemoryGame from './components/MemoryGame.js';

ReactDom.render(
  <MemoryGame mode={4}/>,
  document.getElementById('root')
);
