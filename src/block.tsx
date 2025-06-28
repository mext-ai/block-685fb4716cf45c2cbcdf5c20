import React, { useEffect, useState } from 'react';
import Game from './mario/Game.jsx';
import { HUD } from './mario/HUD.jsx';
import { Landing } from './mario/Landing.jsx';
import './mario/index.css';

interface BlockProps {
}

const Block: React.FC<BlockProps> = () => {
  return (
    <React.StrictMode>
      <Game />
      <HUD />
      <Landing />
    </React.StrictMode>
  );
};

export default Block;
