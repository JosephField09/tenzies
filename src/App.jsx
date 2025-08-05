import Die from "./components/Die"
import React from "react"
import Confetti from 'react-confetti'

export default function App(){
  const [dice, setDice] = React.useState(() => generateAllNewDice())
  const gameWon = dice.every(die => die.isHeld) && dice.every(die => die.value === dice[0].value)
  const newGameButtonRef = React.useRef(null)

  React.useEffect(() => {
    if (gameWon) {
      newGameButtonRef.current.focus()
    }
  }, [gameWon])

  function generateAllNewDice(){
    const newDice = []
    for(let i=0; i<10; i++){
      const num = Math.ceil(Math.random() * 6)
      newDice.push({id:i, value:num, isHeld: false})
    }
    return newDice
  }  

  const diceElements = dice.map(item => <Die 
    key={item.id} 
    id={item.id} 
    value={item.value} 
    isHeld={item.isHeld} 
    hold={hold}
    />)
  
  function rollDice(){
    if (!gameWon){
      setDice(prevDice => prevDice.map(item =>
        item.isHeld ? {...item, value: item.value} : {...item, value: Math.ceil(Math.random() * 6)}
      ))
    } else {
      setDice(generateAllNewDice)
    }
  }

  function hold(id){
    setDice(prevDice => prevDice.map(item => 
      item.id === id ? {...item, isHeld: !item.isHeld} : item
    ))
  }


  return(
    <main>
      {gameWon && <Confetti />}
      <div aria-live="polite" className="sr-only">
        {gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}
      </div>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice">
        {diceElements}
      </div>
      <button 
        ref={newGameButtonRef}
        className="roll-dice" 
        onClick={rollDice}
        >{gameWon?"New Game":"Roll"}</button>
    </main>
  )
}