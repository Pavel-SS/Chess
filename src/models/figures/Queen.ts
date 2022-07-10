import { Cell } from "../Cell";
import { Colors } from "../Color";
import { Figure, FigureNames } from "./Figure";
import blackFigure from "../../assets/Queen_black.png"
import whiteFigure from "../../assets/Queen_white.png"
export class Queen extends Figure {
    constructor(color: Colors, cell: Cell){
        super(color, cell);
        this.figure = color === Colors.BLACK ? blackFigure : whiteFigure;
        this.name = FigureNames.QUEEN; 
    }
    canMove(target: Cell): boolean {
        if(!super.canMove(target)){
            return false
        }
        if(this.cell.isEmptyVertical(target) || this.cell.isEmptyHorizontal(target) || this.cell.isEmptyDiagonal(target)){
            return true
        }
        // if (this.cell.isEmptyHorizontal(target)){
        //     return true
        // }
        // if ( this.cell.isEmptyDiagonal(target)){
        //     return true
        // }
        return false
    }
}