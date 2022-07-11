import React, { useEffect, useRef, useState } from "react";
import { Colors } from "../models/Color";
import { Players } from "../models/Players";

interface TimerProps {
    currentPlayer: Players | null;
    restart: () => void
}

export const Timer: React.FC<TimerProps> = ({currentPlayer, restart}) => {
    const [timePlayerBlack, setTimePlayerBlack] = useState(60);
    const [timePlayerWhite, setTimePlayerWhite] = useState(60);
    const timer = useRef<null | ReturnType<typeof setInterval>>(null)

    useEffect(()=> {
        startTimer()
    }, [currentPlayer])

    function startTimer(){
        if(timer.current){
            clearInterval(timer.current)
        }
        const callback = currentPlayer?.color === Colors.WHITE ? decrementTimerPlayerWhite : decrementTimerPlayerBlack
        timer.current = setInterval(callback, 1000)
    }
    function decrementTimerPlayerBlack(){
        setTimePlayerBlack(prev=> prev - 1)
    }
    function decrementTimerPlayerWhite(){
        setTimePlayerWhite(prev=> prev - 1)
    }
    const handlerRestart = () => {
        setTimePlayerBlack(60)
        setTimePlayerWhite(60)
        restart()
    }
    return(
        <div>
            <div>
                <button onClick={handlerRestart}>Начать новую игру</button>
            </div>
            <h3>
                Черные - {timePlayerBlack}
            </h3>
            <h3>
                Белые - {timePlayerWhite}
            </h3>
        </div>
    )
}