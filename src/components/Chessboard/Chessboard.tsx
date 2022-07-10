import React, { useEffect, useState } from "react";
import { Board } from "../../models/Board";
import { Cell } from "../../models/Cell";
import { CellInBoard } from "../Cell/CellInBoard";

interface BoardProps{
    board: Board;
    setBoard: (board: Board) => void;
}

export const Chessboard: React.FC<BoardProps> = ({board, setBoard}) => {
    const [selectCell, setSelectCell] = useState<Cell | null>(null)

    useEffect(()=>{
        lightAvailableCells()
    },[selectCell])

    function clickCell(cell: Cell){
        // если выбраная клетка не совпадает с клеткой на котолрую мы хотим походить и в эту клетку мы можем перемещать фигуру, тогда мы ее перемещаем, а затем выбраную клетку можно обнулить
        if (selectCell && selectCell !== cell && selectCell.figure?.canMove(cell)) {
            selectCell.moveFigure(cell);
            setSelectCell(null);
            updateBoard()
        }else{
            setSelectCell(cell)
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
        <div className="chessboard">
            {board.cells.map((row,index)=>{
                return(
                    <React.Fragment key={index}>
                        {row.map(cell=>{
                            return(
                                <CellInBoard
                                    cell = {cell}
                                    key = {cell.id}
                                    click = {clickCell}
                                    select = {
                                        cell.x === selectCell?.x &&
                                        cell.y === selectCell?.y
                                    }
                                />
                            )
                        })}
                    </React.Fragment>
                )
            })}
        </div>
    )
}