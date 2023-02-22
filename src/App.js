import './App.css';
import React, { useState } from "react";
import confetti from 'canvas-confetti';
import { Square } from './components/Square';
import { TURNS, WINNER_COMBOS } from './constants/constants';

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
  
  const checkEndGame= (newBoard) => {
    //check if there's a tie game
    // if there are no more empty spaces
    return newBoard.every((square) => square != null)
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
        confetti()
      } // check if the game is over
      else if(checkEndGame(newBoard)){
        setWinner(false) // cat's game
      }

    }
  


  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Reset</button>

      <section className='game'>
        {
          board.map((square, index) => {
            //render every square
            return(
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {square}
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
