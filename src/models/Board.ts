import { Rook } from './figures/Rook';
import { Knight } from './figures/Knight';
import { Bishop } from './figures/Bishop';
import { Pawn } from './figures/Pawn';
import { Queen } from './figures/Queen';
import { Cell } from "./Cell";
import { Colors } from "./Color";
import { King } from "./figures/King";
import { Figure } from './figures/Figure';

export class Board {
    cells: Cell[][] = []
    lostFiguresBlack: Figure[] = []
    lostFiguresWhite: Figure[] = []

    public initCells(){
        for(let i=0; i < 8; i++){
            const row: Cell[] = []
            for(let j = 0; j < 8; j++){
                if( (i + j) % 2 === 0) {
                    row.push(new Cell(this, j, i, Colors.WHITE, null)) // белая ячейка
                } else{
                    row.push(new Cell(this, j, i, Colors.BLACK, null)) // черная ячейка
                }
            }
            this.cells.push(row)
        }
    }

    // подсвечиваем доступный ход
    public lightAvailableCells(selectCell: Cell | null){
        for(let i = 0; i < this.cells.length; i++){
            const row = this.cells[i];
            for( let j = 0; j < row.length; j++){
                const target = row[j];
                target.available = !!selectCell?.figure?.canMove(target)
            }
        }
    }
    // метод получения копии доски
    public getCopyBoard(): Board {
        const newBoard = new Board();
        newBoard.cells = this.cells;
        newBoard.lostFiguresWhite = this.lostFiguresWhite;
        newBoard.lostFiguresBlack = this.lostFiguresBlack;
        return newBoard;
    }

    // расстановка фигур по доске
    public getFigureCell(x: number, y: number){
        return this.cells[y][x]
    }
    //Методы добавления отдельных фигур
    private KingsAdd(){
        new King(Colors.WHITE, this.getFigureCell(4,7))
        new King(Colors.BLACK, this.getFigureCell(4,0))
    }
    private QueensAdd(){
        new Queen(Colors.WHITE, this.getFigureCell(3,7))
        new Queen(Colors.BLACK, this.getFigureCell(3,0))
    }
    private BishopsAdd(){
        new Bishop(Colors.WHITE, this.getFigureCell(2,7))
        new Bishop(Colors.WHITE, this.getFigureCell(5,7))
        new Bishop(Colors.BLACK, this.getFigureCell(2,0))
        new Bishop(Colors.BLACK, this.getFigureCell(5,0))
    }
    private KnightsAdd(){
        new Knight(Colors.WHITE, this.getFigureCell(1,7))
        new Knight(Colors.WHITE, this.getFigureCell(6,7))
        new Knight(Colors.BLACK, this.getFigureCell(1,0))
        new Knight(Colors.BLACK, this.getFigureCell(6,0))
    }
    private RooksAdd(){
        new Rook(Colors.WHITE, this.getFigureCell(0,7))
        new Rook(Colors.WHITE, this.getFigureCell(7,7))
        new Rook(Colors.BLACK, this.getFigureCell(0,0))
        new Rook(Colors.BLACK, this.getFigureCell(7,0))
    }
    private PawnsAdd(){
        for(let i = 0; i < 8; i++){
            new Pawn(Colors.WHITE, this.getFigureCell(i, 6))
            new Pawn(Colors.BLACK, this.getFigureCell(i, 1))
        }
    }

    //добавление фигур на доску
    public addFigureOnBoard(){
        this.KingsAdd()
        this.QueensAdd()
        this.BishopsAdd()
        this.KnightsAdd()
        this.RooksAdd()
        this.PawnsAdd()
    }
    // Метод добавления съеденой фигуры
    addLostFigure(figure: Figure){
        figure.color === Colors.BLACK ? this.lostFiguresBlack.push(figure) : this.lostFiguresWhite.push(figure)
    }
}