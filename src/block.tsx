import React, { useEffect, useState } from 'react';
import Game from './mario/Game';
import { HUD } from './mario/HUD';
import { Landing } from './mario/Landing';
interface BlockProps {
}

const Block: React.FC<BlockProps> = () => {
  return (
    <>
    <Game />
    <HUD />
    <Landing />
    </>
  );
};

export default Block;
