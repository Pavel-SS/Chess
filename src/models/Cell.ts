import { Board } from "./Board";
import { Colors } from "./Color";
import { Figure } from "./figures/Figure";

export class Cell {
    readonly x: number;
    readonly y: number;
    readonly color: Colors;
    figure: Figure | null; // два случая , когда в клетке есть фигура и когда фигуры нет
    board: Board;
    availabel: boolean;// показывает досупность хода выбранной фигуры
    id: number; // для реакт ключей

    constructor(board: Board, x:number, y:number, color:Colors, figure: Figure | null){
        this.x = x;
        this.y = y;
        this.board = board;
        this.color = color;
        this.figure = figure;
        this.availabel = false;
        this.id = Math.random()
    }
}