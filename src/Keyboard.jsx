function Keyboard({ onLetterClick, onDelete, onEnter, letterStates }) {
  const topRow = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P']
  const middleRow = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L']
  const bottomRow = ['Z', 'X', 'C', 'V', 'B', 'N', 'M']

  const getKeyClass = (letter) => {
    const state = letterStates[letter]
    if (!state) return 'key'
    return `key ${state}`
  }

  return (
    <div className="keyboard">
      <div className="keyboard-row">
        {topRow.map(letter => (
          <button
            key={letter}
            className={getKeyClass(letter)}
            onClick={() => onLetterClick(letter)}
          >
            {letter}
          </button>
        ))}
      </div>
      <div className="keyboard-row">
        {middleRow.map(letter => (
          <button
            key={letter}
            className={getKeyClass(letter)}
            onClick={() => onLetterClick(letter)}
          >
            {letter}
          </button>
        ))}
      </div>
      <div className="keyboard-row">
        <button className="key key-large" onClick={onEnter}>
          ENTER
        </button>
        {bottomRow.map(letter => (
          <button
            key={letter}
            className={getKeyClass(letter)}
            onClick={() => onLetterClick(letter)}
          >
            {letter}
          </button>
        ))}
        <button className="key key-large" onClick={onDelete}>
          ⌫
        </button>
      </div>
    </div>
  )
}

export default Keyboard
