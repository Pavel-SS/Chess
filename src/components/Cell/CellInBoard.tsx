import React from "react"
import { Cell } from "../../models/Cell"

interface  CellProps {
    cell: Cell;
    select: boolean;
    click: (cell: Cell) => void
}
export const CellInBoard: React.FC<CellProps> = ({cell, select, click}) => {
    return (
        <div 
            onClick={()=> click(cell)}
            className={
                [
                    'cell', 
                    cell.color, select ? 'selected' : '',
                    cell.available && cell.figure ? 'atack' : ''
                ].join(' ')}
        >
            {cell.available && !cell.figure && <div className="move-available"/>}
            {cell.figure?.figure && <img src={cell.figure.figure} alt='chess'/>}
        </div>
    )
}