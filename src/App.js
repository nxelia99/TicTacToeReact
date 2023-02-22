import './App.css';
import React, { useState } from "react";

//turns 
const TURNS = {
  X: 'x',
  O: 'o'
}



const Square = ({children, updateBoard, index, isSelected}) => {
  const className = `square ${isSelected ? 'is-selected' : ''}`
  const handleClick = () =>{
    updateBoard(index)
  }
  return(
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}

const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 7],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]


function App() {
  //states
  //board (9 positions array), as a state
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.X)
  const [winner, setWinner] = useState(null)
  const checkWinner = (boardToCheck) => {
    for (const combo of WINNER_COMBOS){
      const [a, b, c] = combo
      if(
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ){return boardToCheck[a]}
      
    }
    //in case there's no winner
    return null
  }

  const resetGame = () =>{
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }
  

  const updateBoard = (index) =>{
    
    //don't update the position if it already has a value
    if(board[index] || winner) return
    //spread and rest operator ***
    // update the board and turns
    const newBoard = structuredClone(board) //new board with props
    newBoard[index] = turn // X u O when it's clicked
    setBoard(newBoard) 
    
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    //check if there's a winner
    //async
    const newWinner = checkWinner(newBoard)
    if (newWinner){
        setWinner(newWinner)
      } // check if the game is over

    }
  


  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>

      <section className='game'>
        {
          board.map((_, index) => {
            //render every square
            return(
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {board[index]}
              </Square>
            )
          })
        }
      </section>

      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X} </Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      {
        winner != null && (
          <section className='winner'>
            <div className='text'>
              <h2>
                {
                  winner === false
                    ? 'Empate'
                    : 'Ganó'
                }
              </h2>
              <header className='win'>
                {winner && <Square>{winner}</Square>}
              </header>

              <footer><button onClick={resetGame}>Empezar de nuevo</button></footer>
            </div>
          </section>
        )
      }
    </main>
  );
}

export default App;
