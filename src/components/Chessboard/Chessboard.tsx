import React, { useState } from "react";
import { Board } from "../../models/Board";
import { Cell } from "../../models/Cell";
import { CellInBoard } from "../Cell/CellInBoard";

interface BoardProps{
    board: Board;
    setBoard: (board: Board) => void;
}

export const Chessboard: React.FC<BoardProps> = ({board, setBoard}) => {
    const [selectCell, setSelectCell] = useState<Cell | null>(null)

    function clickCell(cell: Cell){
        if( cell.figure){
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