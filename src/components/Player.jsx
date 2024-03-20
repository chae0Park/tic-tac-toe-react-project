import { useState } from "react";
// useState 와 handleEditClick 함수안에있는 setIsEditing이 왜 다른 함수에 의해 전달되어야하는지
//왜 editing이라는 매개변수를 받아야하는지 찾아보기 
export default function Player({name, symbol}){
    const [ isEditing, setIsEditing ] = useState(false); 

    function handleEditClick(){
        setIsEditing((editing) => !editing);
    }

    let playerName = <span className="player-name">{name}</span>
    let btnCaption = 'Edit';

    if(isEditing){
        playerName = <input type="text" required value={name} />;
        btnCaption = 'Save';
    }

    return(
        <li>
          <span className="player">
            {playerName}
            <span className="player-symbol">{symbol}</span>
          </span>
          <button onClick={handleEditClick}>{btnCaption}</button>
          
        </li>
    )
}