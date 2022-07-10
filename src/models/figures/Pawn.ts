import { Cell } from "../Cell";
import { Colors } from "../Color";
import { Figure, FigureNames } from "./Figure";
import blackFigure from "../../assets/Pawn_black.png"
import whiteFigure from "../../assets/Pawn_white.png"
export class Pawn extends Figure {
    isFirstStep: boolean = true;

    constructor(color: Colors, cell: Cell){
        super(color,cell);
        this.figure = color === Colors.BLACK ? blackFigure : whiteFigure;
        this.name = FigureNames.PAWN;
    }
    canMove(target: Cell): boolean {
        const direction = this.cell.figure?.color === Colors.WHITE ? -1 : 1,
              firstStepDirection = this.cell.figure?.color === Colors.WHITE ? -2 : 2;
        
        if(!super.canMove(target)){
            return false
        }
        if (
            (target.y === this.cell.y + direction 
                || (
                    this.isFirstStep 
                    && (target.y === this.cell.y + firstStepDirection)
                )
            ) 
                && target.x === this.cell.x 
                && this.cell.board.getFigureCell(target.x, target.y).isEmpty() 
        ){
            return true
        }
        if(target.y === this.cell.y + direction 
            && (target.x === this.cell.x + 1 || target.x === this.cell.x - 1)
            && this.cell.isEnemy(target)
        ){
            return true
        }
        return false
    }
    moveFigure(target: Cell): void {
        super.moveFigure(target);
        this.isFirstStep = false;
    }
}