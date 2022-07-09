import React from "react"
import { Cell } from "../../models/Cell"

interface  CellProps {
    cell: Cell
}
export const CellInBoard: React.FC<CellProps> = ({cell}) => {
    return (
        <div 
            className={['cell', cell.color].join(' ')}
        >
            {cell.figure}
        </div>
    )
}