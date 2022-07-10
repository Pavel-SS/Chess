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
}