import { Board } from "./Board";
import { Colors } from "./Color";
import { Figure } from "./figures/Figure";

export class Cell {
    readonly x: number;
    readonly y: number;
    readonly color: Colors;
    figure: Figure | null; // два случая , когда в клетке есть фигура и когда фигуры нет
    board: Board;
    available: boolean;// показывает досупность хода выбранной фигуры
    id: number; // для реакт ключей

    constructor(board: Board, x:number, y:number, color:Colors, figure: Figure | null){
        this.x = x;
        this.y = y;
        this.board = board;
        this.color = color;
        this.figure = figure;
        this.available = false;
        this.id = Math.random()
    }

    //обходим закаольцованную зависимость. Для того чтоб фигура могла двигаться правильно не только из начальной клетки, но и из той клетке вкоторую ее переместили
    setFigure(figure: Figure){
        this.figure = figure;
        this.figure.cell = this;
    }
    //двигаем фигуры по клеткам (если фигура находится в клетке и ее можно перемещать)
    moveFigure(target:Cell){
        if(this.figure && this.figure?.canMove(target)){
            this.figure.moveFigure(target);
            //добавляем фигуру в перемещенную клетку
            target.setFigure(this.figure);
            //удаляем фигуру из той клетки, где она стояла
            this.figure = null;
        }
    }
    // проверка наличия  фигуры в клетке
     isEmpty(): boolean{
        return this.figure === null
     }
    // если есть перед пешкой вражеская фигура, ее нужно побить
     isEnemy(target: Cell):boolean {
         if(target.figure){
             return this.figure?.color !== target.figure.color;
         }
         return false;
     }
    // методы проверки на пустоту, по диагонали вертикали и горизонтали
    isEmptyDiagonal(target: Cell): boolean{
        const absX = Math.abs(target.x - this.x),
              absY = Math.abs(target.y - this.y),

              //куда двигается вперед или назад
             dx = this.x < target.x ? 1 : -1,
             dy = this.y < target.y ? 1 : -1;

        if (absX !== absY){
            return false
        }
        for( let i = 1; i < absY; i++){
            if(!this.board.getFigureCell(this.x + dx*i, this.y + dy*i).isEmpty()){
                return false
            }
        } 
        return true
    }
    isEmptyVertical(target: Cell): boolean{
        if(this.x !== target.x){
            return false
        }
        //вводим диапазон перемещения фигуры с координатами от  min до max
        const min = Math.min(this.y, target.y),
              max = Math.max(this.y, target.y);
        for(let oy = min + 1; oy < max; oy++){
            if(!this.board.getFigureCell(this.x, oy).isEmpty()){
                return false
            }
        }
        return true
    }
    isEmptyHorizontal(target: Cell): boolean{
        if(this.y !== target.y){
            return false
        }
        const min = Math.min(this.x, target.x),
              max = Math.max(this.x, target.x);
        for(let ox = min + 1; ox < max; ox++){
            if(!this.board.getFigureCell(ox, this.y).isEmpty()){
                return false
            }
        }
        return true;
    }
}