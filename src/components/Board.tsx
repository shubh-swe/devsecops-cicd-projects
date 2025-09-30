import React from 'react';
import Square from './Square';

interface BoardProps {
  squares: Array<string | null>;
  onClick: (i: number) => void;
  winningLine: number[] | null;
  mini?: boolean; // 👈 mini board ke liye prop
}

const Board: React.FC<BoardProps> = ({ squares, onClick, winningLine, mini }) => {
  const renderSquare = (i: number) => {
    const isWinningSquare = winningLine?.includes(i) || false;
    return (
      <Square
        value={squares[i]}
        onClick={() => onClick(i)}
        isWinningSquare={isWinningSquare}
        mini={mini}
      />
    );
  };

  return (
    <div className={`grid grid-cols-3 gap-1 ${mini ? "w-20 h-20" : "w-full max-w-xs gap-2"}`}>
      {Array(9).fill(null).map((_, i) => (
        <div key={i}>
          {renderSquare(i)}
        </div>
      ))}
    </div>
  );
};

export default Board;
