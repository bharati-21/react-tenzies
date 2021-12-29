import './App.css';
import {useState, useEffect} from 'react';
import Dice from './components/Dice';
import {nanoid} from 'nanoid';
import Confetti from 'react-confetti';
import { useStopwatch } from 'react-timer-hook';
import Modal from './components/Modal';



function App() {

  const [startGame, setStartGame] = useState(false);
  const [dice, setDice] = useState(generateNewDice());
  const [tenzies, setTenzies] = useState(false);
  const [numRolls, setNumRolls] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  
  function StopWatch(props) {
    return (
      <>
        <span> {props.hours} H </span>:<span> {props.minutes} M </span>:<span> {props.seconds} S</span>
      </>
    );
  }

  const { seconds, minutes, hours, start, pause, reset } =
      useStopwatch({ autoStart: false });

  

  useEffect(() => {
    const allDiceHeld = dice.every(die => die.isHeld);
    const firstValue = dice[0].value;
    const allDiceSameValue = dice.every(die => die.value === firstValue);

    if(allDiceHeld && allDiceSameValue) {
      setTenzies(true);    
      pause();
    }
  }, [dice])

  function beginGame() {
    setStartGame(true);
    start();
  }

  function generateNewDice() {
    const randomNumbers = [];
    for(let i = 0; i<10; i++) {
      randomNumbers.push(generateRandomNumber());
    }
    return randomNumbers;
  }

  function generateRandomNumber() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  function changeHoldState(id) {
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ? 
        {...die, isHeld: !die.isHeld } : die;
    }))
  }

  function modalCloseHandler() {
    setOpenModal(false);
  }

  function rollDice() {
    if(!tenzies) {
      const allDieHeld = dice.every(die => die.isHeld === false);

      if(numRolls === 0 && allDieHeld) {
        setOpenModal(true);

      }
      else {
        setNumRolls(prevNumRolls => prevNumRolls + 1);
        setDice(oldDice => oldDice.map(die => {
          return die.isHeld ? die : generateRandomNumber()
        }))
      }      
    }
    else {   
      setNumRolls(0);
      reset();
      setTenzies(false); 
      setDice(generateNewDice());
    }
  }

  return (
    <div className='wrapper'>
    { startGame ? 
        <main className="main">
          {tenzies && <Confetti /> }
          {openModal && <Modal closeHandler={modalCloseHandler} openModal={openModal}/>}
          <section className='header'>
            <h1 className='title'>Tenzies</h1>
            <p className='subtitle'>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
          </section>
          
          <section className='score-card'>
            <article className='total-rolls'>
              Dice Rolls: {numRolls}
            </article>
            <article className='stop-watch'>Game Time: <StopWatch hours={hours} minutes={minutes} seconds={seconds}/> </article>
          </section>

          <section className='dice-container'>
            {
              dice.map(die => {
                  return <Dice value={die.value} key={die.id} isHeld={die.isHeld} clickHandler={() => changeHoldState(die.id)}/>
              })
            }
          </section>
          <button className='btn-roll-dice' onClick={rollDice}>
            {tenzies ? 'New Game' : 'Roll'}
          </button>
        </main>
      :
        <main className='sub-main'>
          {tenzies && <Confetti /> }
          <section className='header'>
            <h1 className='title'>Tenzies</h1>
            <p className='subtitle'>Every player gets 10 dice. The objective of the game is to roll the dice as fast as possible with all dices having the same number on their face!</p>
          </section>
            <button className='btn-start-game' onClick={beginGame}>Start Game</button>
        </main>
      }
    </div>
  );
}

export default App;
