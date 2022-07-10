import {
    Colors
} from "../Color";
import picFigure from "../../assets/King_white.png"
import {
    Cell
} from "../Cell";

export enum FigureNames {
    KING = 'KING',
    QUEEN = 'QUEEN',
    BISHOP = 'BISHOP',
    KNIGHT = 'KNIGHT',
    ROOK = 'ROOK',
    PAWN = 'PAWN',
}
export class Figure {
    color: Colors;
    figure: typeof picFigure | null;
    cell: Cell;
    name: FigureNames;
    id: number;

    constructor(color: Colors, cell: Cell) {
        this.color = color;
        this.cell = cell;
        this.cell.figure = this;
        this.figure = null;
        this.name = FigureNames.PAWN
        this.id = Math.random()
    }

    canMove(target: Cell): boolean {
        return true;
    }
    moveFigure(target: Cell) {
        
    }
}