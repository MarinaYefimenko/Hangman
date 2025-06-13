type LanguageSwitchProps = {
    language: string,
    setLanguage: (language: string) => void
}

export function LanguageSwitch ({language, setLanguage}: LanguageSwitchProps) {
    return (
        <div style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            display: "flex",
            gap: "1rem",
            padding: "0.5rem 1rem",
            borderRadius: "0.5rem",
            border: "1px solid black",
            fontSize: "1.5rem"
        }}>
            <div 
            onClick={() => setLanguage("ru")}
            style={{ color: language == "en"?"black":"red", cursor: language == "en"?"pointer":"default" }}>
                {language == "en"?"Russian":"Русский"}
                </div>
            <div 
            onClick={() => setLanguage("en")}
            style={{ color: language == "en"?"red":"black", cursor: language == "en"?"default":"pointer"  }}>
                {language == "en"? "English" : "Английский"}
                </div>
        </div>
    );
}