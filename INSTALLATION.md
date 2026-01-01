# Installation Guide

Since you don't have npm installed, you'll need to install Node.js first (npm comes bundled with Node.js).

## Installing Node.js and npm

### Option 1: Using Homebrew (Recommended for macOS)

If you have Homebrew installed:

```bash
brew install node
```

If you don't have Homebrew, install it first:
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### Option 2: Official Installer (Easiest)

1. Go to [nodejs.org](https://nodejs.org/)
2. Download the LTS (Long Term Support) version for macOS
3. Run the installer and follow the instructions
4. This will install both Node.js and npm

### Option 3: Using nvm (Node Version Manager)

If you want to manage multiple Node.js versions:

```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Restart your terminal or run:
source ~/.bashrc

# Install the latest LTS version of Node.js
nvm install --lts
nvm use --lts
```

## Verify Installation

After installation, verify that Node.js and npm are installed:

```bash
node --version
npm --version
```

You should see version numbers for both commands.

## Next Steps

Once Node.js and npm are installed:

1. Navigate to the project directory:
   ```bash
   cd /Users/rayachauhan/Desktop/Enlyite
   ```

2. Install project dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open your browser to the URL shown (typically `http://localhost:5173`)

Enjoy playing Wordle! 🎮
