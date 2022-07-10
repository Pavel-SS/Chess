import { Colors } from './../Color';
import { Figure, FigureNames } from "./Figure";
import blackFigure from "../../assets/Rook_black.png"
import whiteFigure from "../../assets/Rook_white.png"
import { Cell } from '../Cell';
export class Rook extends Figure {
    constructor(color: Colors, cell:Cell){
        super(color,cell);
        this.figure = color === Colors.BLACK ? blackFigure : whiteFigure;
        this.name = FigureNames.ROOK;
    }
    canMove(target: Cell): boolean {
        if(!super.canMove(target)){
            return false
        }
        if (this.cell.isEmptyHorizontal(target) || this.cell.isEmptyVertical(target)){
            return true
        }
        return false
    }
}