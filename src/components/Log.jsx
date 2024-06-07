export default function Log({turns}){

    return <ol id="log">
        {turns.map((turn) => ( //`` 리터럴 문법: 
            <li key={`${turn.square.row}${turn.square.col}`}>
                {turn.player} selected {turn.square.row},{turn.square.col}.
            </li>
        ))} 
    </ol>
}