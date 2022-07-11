import React, { useEffect, useState } from "react";
import { Board } from "../../models/Board";
import { Cell } from "../../models/Cell";
import { Players } from "../../models/Players";
import { CellInBoard } from "../Cell/CellInBoard";

interface BoardProps{
    board: Board;
    setBoard: (board: Board) => void;
    currentPlayer: Players | null;
    changePlayers: () => void
}

export const Chessboard: React.FC<BoardProps> = ({board, setBoard, currentPlayer, changePlayers}) => {
    const [selectCell, setSelectCell] = useState<Cell | null>(null)

    useEffect(()=>{
        lightAvailableCells()
    },[selectCell])

    function clickCell(cell: Cell){
        // если выбраная клетка не совпадает с клеткой на котолрую мы хотим походить и в эту клетку мы можем перемещать фигуру, тогда мы ее перемещаем, а затем выбраную клетку можно обнулить
        if (selectCell && selectCell !== cell && selectCell.figure?.canMove(cell)) {
            selectCell.moveFigure(cell);
            changePlayers()
            setSelectCell(null);
            updateBoard()
        }else{
        //условие для ограничения возможностей перемещения фигур противника. Двигать можно только свои фигуры
            if(cell.figure?.color===currentPlayer?.color){
                setSelectCell(cell)
            }
        }
    }
    
    function lightAvailableCells(){
        board.lightAvailableCells(selectCell)
        updateBoard()
    }

    function updateBoard() {
        const newBoard = board.getCopyBoard()
        setBoard(newBoard)
    }

    return(
        <div className="section__chessboard">
            <h2 className={['panel', currentPlayer?.color === 'cell_black'? "active_black": "active_white"].join(' ')}>
                Ход {[currentPlayer?.color === 'cell_black'?'черного':'белого'].join(' ')} игрока
            </h2>
            <div className="chessboard">
                {board.cells.map((row,index)=>{
                return(
                <React.Fragment key={index}>
                    {row.map(cell=>{
                    return(
                    <CellInBoard cell={cell} key={cell.id} click={clickCell} select={ cell.x===selectCell?.x &&
                        cell.y===selectCell?.y } />
                    )
                    })}
                </React.Fragment>
                )
                })}
            </div>
        </div>  
    )
}