import {useState} from 'react';
import Player from "./components/Player"
import GameBoard from "./components/GameBoard.jsx";
import Log from './components/Log.jsx';
import {WINNING_COMBINATIONS} from './winning-combination.js';
import GameOver from './components/GameOver.jsx';

const PLAYERS = {
  "🐰": 'Player1', 
  "🐯": 'Player2',
}

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns){
  let currentPlayer = "🐰";

  if(gameTurns.length > 0 && gameTurns[0].player === "🐰"){
    currentPlayer = "🐯";
  }
  return currentPlayer;
}

function deriveWinner(gameBoard, players){
//The loop iterates over each winning combination, compares the symbols and checks if they are the same and not 'null'
  let winner;

  for (const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if(
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ){
        winner = players[firstSquareSymbol];
    }
  }

  return winner;  
}

function deriveGameBoard(gameTurns){
  let gameBoard = [...INITIAL_GAME_BOARD.map((innerArray) => [...innerArray])];
  // using for of : if there's any value than it prints the values, if not no values be printed.
  for (const turn of gameTurns){
    const {square, player} = turn;
    const {row, col} = square;

    gameBoard[row][col] = player; // player as in player symbol 
}
  return gameBoard;
}

function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]); // 버튼이 클릭 될 때 마다 array 에 보관

  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);

  //무승부 일 때:
  // hasDraw 라는 상수에 gameTurns 배열의 길이가 9 이고 winner 가 존재하지 않음을 값으로 넣어줌
  const hasDraw = gameTurns.length === 9 && !winner; 
  
  function handleSelectSquare(rowIndex, colIndex){
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [{ square: {row: rowIndex, col: colIndex}, player: currentPlayer}, 
        ...prevTurns
      ];
      return updatedTurns;
    }) 
  }
  
  function handleRestart(){
    setGameTurns([]);
  }

  //handlePlayerNameChange는 Player 컴포넌트에서 Save가 클릭될 때마다 호출되어야 한다 
  function handlePlayerNameChange(symbol, newName){
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName
      };
    });
  }

  return (
    <main>
    <div id="game-container">
      <ol id="players" className='highlight-player'> 
        <Player 
          initialName ={PLAYERS['🐰']}
          symbol="🐰" isActive={activePlayer === '🐰'}
          onChangeName={handlePlayerNameChange}
        ></Player>
        <Player 
          initialName ={PLAYERS['🐯']} 
          symbol="🐯" 
          isActive={activePlayer === '🐯'}
          onChangeName={handlePlayerNameChange}
        ></Player>
      </ol>
      {/* (승자가있던 || 무승부이던 게임오버 사인을 띄운다) */}
      {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart}/>}
      <GameBoard 
      onSelectSquare={handleSelectSquare} 
      board={gameBoard} 
      />
      <h1>React Tic-Tac-Toe</h1>
    </div>
    <Log turns={gameTurns} />
  </main> 
  )
}

export default App
