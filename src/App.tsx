import { useState, useEffect, useCallback } from 'react';
import { HangmanDrawing } from "./components/HangmanDrawing";
import { HangmanWord } from "./components/HangmanWord";
import { Keyboard } from "./components/Keyboard";

import words from "./wordList.json";

function getWord() {
  const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
  }

function App() {
  const [wordToGuess, setWordToGuess] = useState<string>(() => {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
  });
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

  const inCorrectLetters = guessedLetters.filter(letter => !wordToGuess.includes(letter));

  const isLoser = inCorrectLetters.length >= 6;
  const isWinner = wordToGuess.split("").every(letter => guessedLetters.includes(letter));

  const addGuessedLetter = useCallback((letter: string) => {
    if (guessedLetters.includes(letter) || isLoser || isWinner) return;
    setGuessedLetters(currentLetters => [...currentLetters, letter]);
  }, [guessedLetters])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (!key.match(/^[a-z]$/) || guessedLetters.includes(key) || inCorrectLetters.length >= 6) return
      e.preventDefault();
      addGuessedLetter(key);
    }
    document.addEventListener("keydown", handler);
    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, [guessedLetters, inCorrectLetters.length]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (key !== "Enter") return
      e.preventDefault();
      setGuessedLetters([]);
      setWordToGuess (getWord())
    }
    document.addEventListener("keypress", handler);
    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, []);

  return <div style={{
    maxWidth: "800px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "0 auto",
    gap: "2rem"
  }} >
      <div style={{fontSize: "2rem", textAlign: "center"}}>
        {isWinner && "Winner! - Refresh to try again"}
        {isLoser && "Nice try! - Refresh to try again"}
        {!isWinner && !isLoser && "Guess the word!"}
      </div>
      <HangmanDrawing numberOfGuesses={inCorrectLetters.length}/>
      <HangmanWord reveal={isLoser} guessedLetters={guessedLetters} wordToGuess={wordToGuess}/>
      <div style={{
        alignSelf: "stretch",
      }}>
        <Keyboard 
        disabled={isWinner || isLoser}
        activeLetters={guessedLetters.filter(letter => wordToGuess.includes(letter))}
        inactiveLetters={inCorrectLetters}
        addGuessedLetter={addGuessedLetter}  
          />
      </div>
      
  </div>
}

export default App
