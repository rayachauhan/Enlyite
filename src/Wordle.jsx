import { useState, useEffect } from 'react'
import WordleRow from './WordleRow'
import Keyboard from './Keyboard'
import { WORDS, VALID_GUESSES } from './words'

const WORD_LENGTH = 5
const MAX_GUESSES = 6

function Wordle() {
  const [targetWord, setTargetWord] = useState('')
  const [guesses, setGuesses] = useState(Array(MAX_GUESSES).fill(''))
  const [currentGuess, setCurrentGuess] = useState('')
  const [currentRow, setCurrentRow] = useState(0)
  const [gameState, setGameState] = useState('playing') // 'playing', 'won', 'lost'
  const [letterStates, setLetterStates] = useState({}) // Track letter colors for keyboard

  // Initialize target word on mount
  useEffect(() => {
    const randomWord = WORDS[Math.floor(Math.random() * WORDS.length)]
    setTargetWord(randomWord)
  }, [])

  const handleLetterInput = (letter) => {
    if (currentGuess.length < WORD_LENGTH) {
      setCurrentGuess(currentGuess + letter)
    }
  }

  const handleDelete = () => {
    setCurrentGuess(currentGuess.slice(0, -1))
  }

  const handleSubmit = () => {
    if (currentGuess.length !== WORD_LENGTH) {
      return // Word must be 5 letters
    }

    if (!VALID_GUESSES.includes(currentGuess)) {
      alert('Not a valid word!')
      return
    }

    // Update guesses array
    const newGuesses = [...guesses]
    newGuesses[currentRow] = currentGuess
    setGuesses(newGuesses)

    // Check if won
    if (currentGuess === targetWord) {
      setGameState('won')
      return
    }

    // Update letter states for keyboard
    const newLetterStates = { ...letterStates }
    const targetArray = targetWord.split('')
    const guessArray = currentGuess.split('')

    guessArray.forEach((letter, index) => {
      if (!newLetterStates[letter]) {
        newLetterStates[letter] = 'absent'
      }

      if (targetArray[index] === letter) {
        newLetterStates[letter] = 'correct'
      } else if (targetArray.includes(letter)) {
        // Only update if not already correct (to avoid downgrading)
        if (newLetterStates[letter] !== 'correct') {
          newLetterStates[letter] = 'present'
        }
      }
    })

    setLetterStates(newLetterStates)

    // Move to next row
    const nextRow = currentRow + 1
    if (nextRow >= MAX_GUESSES) {
      setGameState('lost')
    } else {
      setCurrentRow(nextRow)
      setCurrentGuess('')
    }
  }

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (gameState !== 'playing') return
      
      const key = e.key.toUpperCase()
      
      if (key === 'ENTER') {
        handleSubmit()
      } else if (key === 'BACKSPACE') {
        handleDelete()
      } else if (key.length === 1 && key >= 'A' && key <= 'Z') {
        handleLetterInput(key)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [currentGuess, currentRow, gameState, targetWord, guesses, letterStates])

  const resetGame = () => {
    const randomWord = WORDS[Math.floor(Math.random() * WORDS.length)]
    setTargetWord(randomWord)
    setGuesses(Array(MAX_GUESSES).fill(''))
    setCurrentGuess('')
    setCurrentRow(0)
    setGameState('playing')
    setLetterStates({})
  }

  const getLetterState = (letter, index, guess) => {
    if (!guess || !letter || !letter.trim()) return 'empty'
    
    const targetArray = targetWord.split('')
    const guessArray = guess.split('')
    letter = letter.trim()

    // Exact match (correct position)
    if (targetArray[index] === letter) {
      return 'correct'
    }

    // Check if letter exists in target word
    if (!targetArray.includes(letter)) {
      return 'absent'
    }

    // For letters that exist but not in correct position:
    // We need to mark them as 'present' only if there are enough instances
    
    // Count total occurrences in target
    const targetCount = targetArray.filter(l => l === letter).length
    
    // First, mark all correct positions
    const correctIndices = []
    guessArray.forEach((l, i) => {
      if (l === letter && targetArray[i] === letter) {
        correctIndices.push(i)
      }
    })
    
    // Count remaining available slots for "present" (total - correct)
    const remainingSlots = targetCount - correctIndices.length
    
    // Count how many times this letter appears before current index
    // that are NOT already marked as correct
    let presentCountBefore = 0
    for (let i = 0; i < index; i++) {
      if (guessArray[i] === letter && !correctIndices.includes(i)) {
        presentCountBefore++
      }
    }
    
    // Mark as present only if we haven't used up all available slots
    if (presentCountBefore < remainingSlots) {
      return 'present'
    }
    
    return 'absent'
  }

  return (
    <div className="wordle-container">
      <div className="wordle-header">
        <h1>WORDLE</h1>
        {gameState !== 'playing' && (
          <div className="game-over">
            {gameState === 'won' ? (
              <p className="win-message">🎉 You Won!</p>
            ) : (
              <p className="lose-message">
                Game Over! The word was: <strong>{targetWord}</strong>
              </p>
            )}
            <button onClick={resetGame} className="reset-button">
              New Game
            </button>
          </div>
        )}
      </div>

      <div className="wordle-board">
        {guesses.map((guess, rowIndex) => (
          <WordleRow
            key={rowIndex}
            guess={rowIndex === currentRow ? currentGuess : guess}
            targetWord={targetWord}
            isSubmitted={rowIndex < currentRow || (rowIndex === currentRow && guess !== '')}
            getLetterState={getLetterState}
          />
        ))}
      </div>

      <Keyboard
        onLetterClick={handleLetterInput}
        onDelete={handleDelete}
        onEnter={handleSubmit}
        letterStates={letterStates}
      />
    </div>
  )
}

export default Wordle
