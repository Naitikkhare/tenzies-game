import React from "react";
import Die from "./die";
import { nanoid } from 'nanoid'

function App() {

  const [dice, setDice] = React.useState(allNewDice())
  const [count, setCount] = React.useState(0)
  const [tenzies, setTenzies] = React.useState(false)

  function generateNew () {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDice() {
    const newDice = []
    for(let i = 0; i < 10; i++) {
      newDice.push(generateNew())
    }
    return newDice
  }

  function rollDice() {
    if(!tenzies) {
      setCount(count+1)
      setDice(item => item.map(die => {
        return (die.isHeld ? die : generateNew())
      }))
    }
    else {
      setTenzies(false)
      setCount(0)
      setDice(allNewDice())
    }
  }

  function holdDice(id) {
    setDice(item => item.map(die => {
      return die.id === id ? {...die, isHeld: !die.isHeld} : die
    }))
  }

  const diceElement = dice.map(item => (
    <Die 
      key={item.id}
      value={item.value}
      isheld={item.isHeld}
      onClick = {() => holdDice(item.id)}
    />
  ))

  React.useEffect(() => {
    const held = dice.every(item => item.isHeld)
    const first = dice[0].value
    const sameVal = dice.every(item => item.value === first)
    if(held && sameVal) {
      setTenzies(true)
    }
  },[dice])

  return (
    <main>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. 
        Click each die to freeze it at its current value between rolls.
      </p>
      <div className="main-container">
        {diceElement}
      </div>
      <button className="btn" onClick={rollDice}>
        {tenzies ? `New Game Your Count is ${count}`: `Roll ${count}`}
      </button>
    </main>
  )
}

export default App;
