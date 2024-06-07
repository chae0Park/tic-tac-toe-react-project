export default function GameBoard({onSelectSquare, board}){
    return <ol id="game-board">
        {board.map((row, rowIndex) => (
            <li key={rowIndex}>
                <ol>
                    {row.map((playerSymbol, colIndex) => (
                        <li key={colIndex}>
                            <button 
                                onClick={() => onSelectSquare(rowIndex, colIndex)} // param 넘겨주지 않으면 클릭이 작동이 안됨
                                disabled={playerSymbol !== null}
                            >
                                {playerSymbol}
                            </button>
                        </li>
                    ))}
                </ol>
            </li>
        ))}
    </ol>;
}