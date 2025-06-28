import React, { useEffect, useState } from 'react';

interface BlockProps {
}

const Block: React.FC<BlockProps> = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      fontFamily: 'Arial, sans-serif',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      margin: 0,
      color: 'white'
    }}>
     <img src="/mext.png" alt="mext" />
    </div>
  );
};

export default Block;
