import React from 'react';
import { History, Clock } from 'lucide-react';
import Board from './Board';

interface GameHistoryProps {
  history: Array<{
    winner: string | null;
    board: Array<string | null>;
    date: Date;
  }>;
  players: { X: string; O: string };
}

const GameHistory: React.FC<GameHistoryProps> = ({ history, players }) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }).format(date);
  };

  const getResultText = (winner: string | null) => {
    if (winner === 'X') return `${players.X} won`;
    if (winner === 'O') return `${players.O} won`;
    return "Draw";
  };

  const getResultColorClass = (winner: string | null) => {
    if (winner === 'X') return 'text-indigo-500';
    if (winner === 'O') return 'text-purple-500';
    return 'text-gray-500';
  };

  return (
    <div className="bg-gray-800/60 backdrop-blur-md p-4 rounded-lg border border-gray-700 text-white">
      <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
        <History className="h-5 w-5 text-blue-400" />
        Game History
      </h2>

      <div className="max-h-64 overflow-y-auto space-y-3 pr-1">
        {history.length === 0 ? (
          <p className="text-gray-400 text-sm italic">No games played yet</p>
        ) : (
          [...history].reverse().map((game, index) => (
            <div key={index} className="p-3 bg-gray-900/70 rounded border border-gray-700">
              <div className="flex justify-between items-center mb-2">
                <span className={`font-medium ${getResultColorClass(game.winner)}`}>
                  {getResultText(game.winner)}
                </span>
                <span className="text-gray-400 flex items-center gap-1 text-xs">
                  <Clock className="h-3 w-3" />
                  {formatDate(game.date)}
                </span>
              </div>
              {/* 👇 mini board snapshot */}
              <Board squares={game.board} onClick={() => {}} winningLine={null} mini />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default GameHistory;
