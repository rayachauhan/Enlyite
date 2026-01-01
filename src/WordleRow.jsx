function WordleRow({ guess, targetWord, isSubmitted, getLetterState }) {
  const letters = guess.padEnd(5, ' ').split('')

  return (
    <div className="wordle-row">
      {letters.map((letter, index) => {
        const state = isSubmitted && targetWord ? getLetterState(letter.trim(), index, guess) : 'empty'
        return (
          <div key={index} className={`wordle-cell ${state}`}>
            {letter.trim()}
          </div>
        )
      })}
    </div>
  )
}

export default WordleRow
