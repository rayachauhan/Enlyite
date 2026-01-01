# Wordle Game

A classic Wordle game built with Vite and React.

## Features

- 6 attempts to guess a 5-letter word
- Color-coded feedback:
  - 🟩 Green: Correct letter in correct position
  - 🟨 Yellow: Correct letter in wrong position
  - ⬛ Gray: Letter not in the word
- Virtual keyboard with visual feedback
- Physical keyboard support
- Win/lose detection
- New game functionality

## Prerequisites

You need Node.js and npm installed to run this project. If you don't have them installed, see [INSTALLATION.md](INSTALLATION.md) for detailed installation instructions.

**Quick Install Options:**
- **macOS with Homebrew**: `brew install node`
- **Download installer**: Visit [nodejs.org](https://nodejs.org/) and download the LTS version
- **Using nvm**: See INSTALLATION.md for instructions

## Getting Started

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

The game will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## How to Play

1. Type a 5-letter word using the keyboard (physical or on-screen)
2. Press ENTER to submit your guess
3. The tiles will change color to show how close your guess was
4. Use the feedback to make your next guess
5. You have 6 attempts to guess the word!

## Technologies

- React 18
- Vite 5
- CSS3

Enjoy playing Wordle! 🎮
