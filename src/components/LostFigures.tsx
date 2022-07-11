import React from "react";

import { Figure } from "../models/figures/Figure";

interface LostFiguresProps{
    title: string;
    figures: Figure[]
}
export const LostFigures: React.FC<LostFiguresProps> = ({title, figures}) => {
    return(
        <div className="lost-figure">
            <h3>
                {title}
            </h3>
            <div>
                {figures.map(fig => {
                    return(   
                        <div key={fig.id}>
                            
                            {fig.figure 
                            && <img src={fig.figure} alt="chess figure"/> 
                            }
                            <p>
                                {fig.name}
                            </p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
    
}