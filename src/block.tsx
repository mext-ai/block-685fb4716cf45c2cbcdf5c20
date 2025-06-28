import React, { useEffect, useState } from 'react';
import Game from './mario/Game';
interface BlockProps {
}

const Block: React.FC<BlockProps> = () => {
  return (
    <Game />
  );
};

export default Block;
