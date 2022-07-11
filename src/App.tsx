import React, { useEffect, useState } from 'react';
import './App.css';
import { Chessboard } from './components/Chessboard/Chessboard';
import { LostFigures } from './components/LostFigures';
import { Timer } from './components/Timer';
import { Board } from './models/Board';
import { Colors } from './models/Color';
import { Players } from './models/Players';

function App() {
  const [board, setBoard] = useState(new Board())
  const [playerWhite, setPlayerWhite] = useState(new Players(Colors.WHITE))
  const [playerBlack, setPlayerBlack] = useState(new Players(Colors.BLACK))
  const [currentPlayer, setCurrentPlayer] = useState<Players | null>(null)
  // используем хук useEffect для того чтобы при старте игры получить новую доску
  useEffect(()=>{
    restart()
  },[])

  //функция перезапуска игры
  function restart(){
    const newBoard =  new Board();
    newBoard.initCells()
    newBoard.addFigureOnBoard()
    setBoard(newBoard)
    setCurrentPlayer(playerWhite)
  }
 //функция переключения игрока
  function changePlayers(){
    setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? playerBlack : playerWhite)
  }

  return (
    <div className='App'>
      <LostFigures 
        title ='Белые фигуры'
        figures = {board.lostFiguresWhite} 
      />
      <Chessboard 
        board={board}
        setBoard={setBoard}
        currentPlayer = {currentPlayer}
        changePlayers = {changePlayers}
      />
      
      <LostFigures
        title ='Черные фигуры'
        figures = {board.lostFiguresBlack} 
      />
      <Timer
        restart={restart}
        currentPlayer={currentPlayer}
      />
    </div>
  );
}

export default App;
