import { useState, useEffect, useCallback } from 'react';
import { HangmanDrawing } from "./components/HangmanDrawing";
import { HangmanWord } from "./components/HangmanWord";
import { Keyboard } from "./components/Keyboard";
import { LanguageSwitch } from './components/LanguageSwitch';

import words from "./wordList.json";
import wordsRu from "./wordListRu.json";



function App() {
  const [language, setLanguage] = useState<string>("en");

  const [wordToGuess, setWordToGuess] = useState<string>(
    getWord
  );
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

  function getWord() {
    const randomIndex = Math.floor(Math.random() * wordsRu.length);
    return language == "en"? words[randomIndex] : wordsRu[randomIndex];
    }

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
      if (language === "ru" && !/^[а-яё]$/i.test(key) || guessedLetters.includes(key) || inCorrectLetters.length >= 6) return
      if (language === "en" && !/^[a-z]$/i.test(key) || guessedLetters.includes(key) || inCorrectLetters.length >= 6) return
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

  useEffect(() => {
    setGuessedLetters([]);
    setWordToGuess (getWord())
  }, [language]);

  return <div style={{
    maxWidth: "1400px",
    maxHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "0 auto",
    gap: "1.5rem"
  }} >
      <LanguageSwitch language={language} setLanguage={setLanguage} />
      {language == "en"?
      <div style={{fontSize: "2rem", textAlign: "center"}}>
        {isWinner && "Winner! - Refresh to try again"}
        {isLoser && "Nice try! - Refresh to try again"}
        {!isWinner && !isLoser && "Guess the word!"}
      </div>
      :
      <div style={{fontSize: "2rem", textAlign: "center"}}>
        {isWinner && "Вы победили! - Обновите страницу, чтобы попробовать снова"}
        {isLoser && "Хорошая попытка! - Обновите страницу, чтобы попробовать снова"}
        {!isWinner && !isLoser && "Угадайте слово!"}
      </div>
      }
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
        language={language}  
          />
      </div>
      
  </div>
}

export default App
