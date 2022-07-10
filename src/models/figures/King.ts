import { Cell } from "../Cell";
import { Colors } from "../Color";
import { Figure, FigureNames } from "./Figure";
import blackFigure from "../../assets/King_black.png"
import whiteFigure from "../../assets/King_white.png"
export class King extends Figure {
    constructor(color: Colors, cell: Cell){
        super(color, cell);
        this.figure = color === Colors.BLACK ? blackFigure : whiteFigure;
        this.name = FigureNames.KING
    }
    canMove(target: Cell): boolean {
        if(!super.canMove(target)){
            return false
        }
        const dx = this.cell.x < target.x ? 1 : -1,
              dy = this.cell.y < target.y ? 1 : -1,
              absX = Math.abs(target.x - this.cell.x),
              absY = Math.abs(target.y - this.cell.y);
        if(absX === absY && absX === 1){
            return true
        }
        if (target.y === this.cell.y + dy && target.x === this.cell.x && this.cell.board.getFigureCell(target.x, target.y)){
            return true
        }
        if (target.x === this.cell.x + dx && target.y === this.cell.y && this.cell.board.getFigureCell(target.x, target.y)){
            return true
        }
        return false
    }
}