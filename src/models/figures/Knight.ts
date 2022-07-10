import { Cell } from "../Cell";
import { Colors } from "../Color";
import { Figure, FigureNames } from "./Figure";
import blackFigure from "../../assets/Knight_black.png"
import whiteFigure from "../../assets/Knight_white.png"

export class Knight extends Figure {
    constructor(color: Colors, cell: Cell){
        super(color,cell);
        this.figure = color === Colors.BLACK ? blackFigure : whiteFigure;
        this.name = FigureNames.KNIGHT
    }
    canMove(target: Cell): boolean {
        if(!super.canMove(target)){
            return false
        }
        const dx = Math.abs(this.cell.x - target.x),
              dy = Math.abs(this.cell.y - target.y);
        return (dx === 1 && dy === 2) || (dx === 2 && dy === 1)
    }
}