import React from 'react';
import { Trophy, User, Users } from 'lucide-react';

interface ScoreBoardProps {
  scores: { X: number; O: number; draws: number };
  players: { X: string; O: string };
  setPlayers: React.Dispatch<React.SetStateAction<{ X: string; O: string }>>;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ scores, players, setPlayers }) => {
  const handleNameChange = (player: 'X' | 'O', newName: string) => {
    setPlayers(prev => ({ ...prev, [player]: newName }));
  };

  return (
    <div className="bg-gray-800/60 backdrop-blur-md p-4 rounded-lg border border-gray-700 text-white">
      <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
        <Trophy className="h-5 w-5 text-yellow-400" />
        Score Board
      </h2>

      <div className="space-y-2">
        {/* Player X */}
        <div className="flex justify-between items-center p-2 bg-indigo-900/40 rounded">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-indigo-400" />
            <input
              type="text"
              value={players.X}
              onChange={e => handleNameChange("X", e.target.value)}
              className="bg-transparent border-b border-indigo-500 text-sm focus:outline-none"
            />
          </div>
          <span className="text-lg font-bold text-indigo-400">{scores.X}</span>
        </div>

        {/* Player O */}
        <div className="flex justify-between items-center p-2 bg-purple-900/40 rounded">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-purple-400" />
            <input
              type="text"
              value={players.O}
              onChange={e => handleNameChange("O", e.target.value)}
              className="bg-transparent border-b border-purple-500 text-sm focus:outline-none"
            />
          </div>
          <span className="text-lg font-bold text-purple-400">{scores.O}</span>
        </div>

        {/* Draws */}
        <div className="flex justify-between items-center p-2 bg-gray-700/40 rounded">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-gray-400" />
            <span className="font-medium">Draws</span>
          </div>
          <span className="text-lg font-bold text-gray-400">{scores.draws}</span>
        </div>
      </div>
    </div>
  );
};

export default ScoreBoard;
