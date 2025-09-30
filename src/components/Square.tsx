import React from 'react';

interface SquareProps {
  value: string | null;
  onClick: () => void;
  isWinningSquare: boolean;
  mini?: boolean;
}

const Square: React.FC<SquareProps> = ({ value, onClick, isWinningSquare, mini }) => {
  const baseClasses = mini
    ? "w-6 h-6 text-xs flex items-center justify-center rounded-sm"
    : "w-full h-20 text-4xl font-bold flex items-center justify-center rounded-md transition-all duration-200";

  const getSquareClasses = () => {
    if (isWinningSquare) {
      return `${baseClasses} bg-green-200 text-green-900 border-2 border-green-500 animate-pulse`;
    }
    if (!value) {
      return `${baseClasses} bg-gray-200/40 hover:bg-gray-300/50 cursor-pointer`;
    }
    if (value === 'X') {
      return `${baseClasses} bg-indigo-200/40 text-indigo-400`;
    }
    return `${baseClasses} bg-purple-200/40 text-purple-400`;
  };

  return (
    <button
      className={getSquareClasses()}
      onClick={onClick}
      disabled={mini} // 👈 mini board snapshot click disabled
      aria-label={value ? `Square with ${value}` : "Empty square"}
    >
      {value}
    </button>
  );
};

export default Square;
