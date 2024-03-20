import Player from "./components/Player"
function App() {
  return (
    <main>
    <div id="game-container">
      <ol id="players"> 
        <Player name="Player 1" symbol="X"></Player>
        <Player name="Player 2" symbol="O"></Player>
      </ol>

      GAME BOARD
      <h1>React Tic-Tac-Toe</h1>
    </div>

    LOG
  </main> 
  )
}

export default App
