import React, { useEffect, useState } from 'react';
import './App.css';
import { Chessboard } from './components/Chessboard/Chessboard';
import { Board } from './models/Board';

function App() {
  const [board, setBoard] = useState(new Board())
  
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
  }

  return (
    <div className='App'>
      <Chessboard 
        board={board}
        setBoard={setBoard}
      />
    </div>
  );
}

export default App;
