import React from "react";
import { Board } from "../../models/Board";
import { CellInBoard } from "../Cell/CellInBoard";

interface BoardProps{
    board: Board;
    setBoard: (board: Board) => void;
}

export const Chessboard: React.FC<BoardProps> = ({board, setBoard}) => {
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
                                />
                            )
                        })}
                    </React.Fragment>
                )
            })}
        </div>
    )
}