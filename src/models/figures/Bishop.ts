import { Cell } from "../Cell";
import { Colors } from "../Color";
import { Figure, FigureNames } from "./Figure";
import blackFigure from "../../assets/Bishop_black.png"
import whiteFigure from "../../assets/Bishop_white.png"

export class Bishop extends Figure {
    constructor(color: Colors, cell: Cell){
        super(color,cell);
        this.figure = color === Colors.BLACK ? blackFigure : whiteFigure;
        this.name = FigureNames.BISHOP;
    }
}