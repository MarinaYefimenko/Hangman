import styles from "./Keyboard.module.css";

const KEYS_EN = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ]

  const KEYS_RU = [
    "а",
    "б",
    "в",
    "г",
    "д",
    "е",
    "ж",
    "з",
    "и",
    "й",
    "к",
    "л",
    "м",
    "н",
    "о",
    "п",
    "р",
    "с",
    "т",
    "у",
    "ф",
    "х",
    "ц",
    "ч",
    "ш",
    "щ",
    "ъ",
    "ы",
    "ь",
    "э",
    "ю",
    "я"
  ];
  
  
type KeyboardProps = {
    activeLetters: string[];
    inactiveLetters: string[];
    addGuessedLetter: (letter: string) => void;
    disabled?: boolean; 
    language?: string; 
}

export function Keyboard({ activeLetters, disabled = false, inactiveLetters, addGuessedLetter, language }: KeyboardProps){
    const KEYS = language === "ru" ? KEYS_RU : KEYS_EN;
    return <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(75px, 1fr))",
        gap: ".5rem",
        margin: "2rem 0",
    }}>
        {KEYS.map(key => {
        const isActive = activeLetters.includes(key);
        const isInactive = inactiveLetters.includes(key);
        return (
            <button 
            onClick={() => addGuessedLetter(key)}
                key={key} className={`${styles.btn} ${isActive ? styles.active : ""} ${isInactive ? styles.inactive : ""}`}
                disabled={isActive || isInactive || disabled}>
                {key}
            </button>
        )})}
    </div>
}