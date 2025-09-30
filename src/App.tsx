import React, { useState, useEffect } from 'react';
import { RefreshCw, Rocket, Star } from 'lucide-react';
import Board from './components/Board';
import ScoreBoard from './components/ScoreBoard';
import GameHistory from './components/GameHistory';
import { calculateWinner, checkDraw } from './utils/gameLogic';

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [scores, setScores] = useState({ X: 0, O: 0, draws: 0 });
  const [gameHistory, setGameHistory] = useState<Array<{
    winner: string | null;
    board: Array<string | null>;
    date: Date;
  }>>([]);
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'draw'>('playing');
  const [winningLine, setWinningLine] = useState<number[] | null>(null);

  // player names
  const [players, setPlayers] = useState({ X: "Shubh", O: "Opponent" });

  // Check winner/draw
  useEffect(() => {
    const result = calculateWinner(board);

    if (result) {
      setGameStatus('won');
      setWinningLine(result.line);

      setScores(prev => ({
        ...prev,
        [result.winner]: prev[result.winner as keyof typeof prev] + 1
      }));

      setGameHistory(prev => [
        ...prev,
        { winner: result.winner, board: [...board], date: new Date() }
      ]);
    } else if (checkDraw(board)) {
      setGameStatus('draw');
      setScores(prev => ({ ...prev, draws: prev.draws + 1 }));

      setGameHistory(prev => [
        ...prev,
        { winner: null, board: [...board], date: new Date() }
      ]);
    }
  }, [board]);

  // handle clicks
  const handleClick = (i: number) => {
    if (board[i] || gameStatus !== "playing") return;

    const newBoard = [...board];
    newBoard[i] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  // reset game
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setGameStatus("playing");
    setWinningLine(null);
  };

  // reset all
  const resetAll = () => {
    resetGame();
    setScores({ X: 0, O: 0, draws: 0 });
    setGameHistory([]);
  };

  // status banner
  const statusMessage = () => {
    if (gameStatus === "won") {
      const winner = !xIsNext ? "X" : "O";
      return `${players[winner as "X" | "O"]} wins 🚀`;
    } else if (gameStatus === "draw") {
      return "🌌 It's a cosmic draw!";
    } else {
      return `Next turn: ${xIsNext ? players.X : players.O}`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-900 via-indigo-900 to-purple-900 flex flex-col items-center justify-center p-6">
      <div className="max-w-5xl w-full bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-indigo-700">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center">
          <h1 className="text-4xl font-extrabold flex items-center justify-center gap-3 tracking-wide">
            <Rocket className="h-9 w-9 animate-bounce" />
            Tic Tac Galaxy
          </h1>
          <p className="text-indigo-200 mt-1">Battle among the stars ✨</p>
        </div>

        <div className="p-6 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Game Board */}
          <div className="md:col-span-2 flex flex-col items-center">
            <div className="mb-6 text-center">
              <span className="inline-block px-4 py-2 rounded-full bg-indigo-700 text-white font-semibold shadow">
                {statusMessage()}
              </span>
            </div>

            <Board squares={board} onClick={handleClick} winningLine={winningLine} />

            <div className="mt-8 flex gap-4">
              <button
                onClick={resetGame}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-5 rounded-lg shadow-md transition-transform hover:scale-105"
              >
                <RefreshCw className="h-4 w-4" />
                New Round
              </button>
              <button
                onClick={resetAll}
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-5 rounded-lg shadow-md transition-transform hover:scale-105"
              >
                Reset All
              </button>
            </div>
          </div>

          {/* Score + History */}
          <div className="flex flex-col gap-6">
            {/* ⭐ Star Banner */}
            <div className="flex items-center gap-2 text-yellow-400 font-semibold text-lg justify-center">
              <Star className="h-5 w-5" /> Legendary Matches
            </div>
            <ScoreBoard scores={scores} players={players} setPlayers={setPlayers} />
            <GameHistory history={gameHistory} players={players} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
