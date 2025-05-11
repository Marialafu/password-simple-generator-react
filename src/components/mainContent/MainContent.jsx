import { useState } from 'react'
import styles from './mainContainer.module.css'
import {CHARACTERS} from '../../constants/characters'

const symbols = CHARACTERS.symbols
const numbers = CHARACTERS.numbers
const lowercase = CHARACTERS.lowercaseLetters
const uppercase = CHARACTERS.uppercaseLetters

let definedCharacters = null
let password = null

const MainContent = () => {
    const minLength = 4
    const maxLength = 32

    const [rangeBarValue, setRangeBarValue] = useState(minLength)
    const [generatedPasswordButton, setGeneratedPasswordButton] = useState('')

    const [symbolsCheckboxState, setSymbolsCheckboxState] = useState(false)
    const [numbersCheckboxState, setNumbersCheckboxState] = useState(false)
    const [lowercaseCheckboxState, setLowercaseCheckboxState] = useState(false)
    const [uppercaseCheckboxState, setUppercaseCheckboxState] = useState(false)

    const passwordInputClass = 
    `${styles.passwordBlock} ${styles.passwordText}`
    const buttonClass = 
    `${styles.text} ${styles.generatePasswordButton}`

    return (
    <>
        <input type="text" placeholder="P4$5WORD!" value={generatedPasswordButton} readOnly className={passwordInputClass}/>
        <p>LENGTH: {rangeBarValue}</p>
        <div className={styles.rangeComponentBar}>
          <span className={styles.text}>{minLength}</span>
          <input 
          type="range" 
          id="range-bar" 
          max={maxLength} 
          min={minLength} 
          value={rangeBarValue}
          className={styles.rangeBar} 
          onChange={event => setRangeBarValue(Number(event.target.value))} />
          <span className={styles.text}>{maxLength}</span>

        </div>
        <div className={styles.checkboxAll}>
          <div className={styles.checkboxGroup}>
            <p>Include Uppercase</p>
            <input className={styles.checkboxSwitch} type="checkbox" id="uppercase"
            onChange={() => setUppercaseCheckboxState(!uppercaseCheckboxState)}
            checked={uppercaseCheckboxState}
            />
            <label className={styles.switch} htmlFor="uppercase"></label>
          </div>
          <div className={styles.checkboxGroup}>
            <p>Include Lowercase</p>
            <input 
            type="checkbox" 
            id="lowercase" 
            className={styles.checkboxSwitch}
            onChange={() => setLowercaseCheckboxState(!lowercaseCheckboxState)} 
            checked={lowercaseCheckboxState}
            />
            <label className={styles.switch}  htmlFor="lowercase"></label>
          </div>
          <div className={styles.checkboxGroup}>
            <p>Include Numbers</p>
            <input 
            type="checkbox" 
            id="numbers" 
            className={styles.checkboxSwitch}
            //por qué en este caso hay que poner () => pero cuando llamo función no.
            onChange={() => setNumbersCheckboxState(!numbersCheckboxState)}
            //pensé que habría que utilizar checked pero ya consigo el valor en el onChange. Josefa me ha dicho que es más seguro acceder al valor a través de checked. en setNumber con (e) => setNumbers(e.target.checked). Por qué?, es verdad?
            checked={numbersCheckboxState} 
            />
            <label htmlFor="numbers" className={styles.switch} ></label>
          </div>
          <div className={styles.checkboxGroup}>
            <p>Include Symbols</p>
            <input 
            type="checkbox" 
            id="symbols" 
            className={styles.checkboxSwitch} 
            onChange={() => setSymbolsCheckboxState(!symbolsCheckboxState)}
            checked={symbolsCheckboxState} />
            <label htmlFor="symbols" className={styles.switch} ></label>
          </div>
        </div>
        <button 
        disabled={changeButtonState(symbolsCheckboxState, numbersCheckboxState, lowercaseCheckboxState, uppercaseCheckboxState)}
        //para encadenar funciones tengo que hacer esto? los dos últimos valores no los necesitaba hasta el generate password pero si no se los pasaba a defineCharacters no podía acceder a ellos. Entiendo que si las fucniones se hacen dentro de toda esta función no hace falta esto, pero es mejor fuera. Pero al hacerlo fuera queda larguísimo. ¿Es así como se hace?
        onClick={() => defineCharactersInPassword(symbolsCheckboxState, numbersCheckboxState, lowercaseCheckboxState, uppercaseCheckboxState, setGeneratedPasswordButton, rangeBarValue)} 
        className={buttonClass}>Generate password</button>
    </>
    )
}

const generateAleatoryCharacter = (maxLength) => {
    const aleatoryCharacter = Math.floor(Math.random()*maxLength)
    return aleatoryCharacter
}

const changeButtonState = (symbolsCheckboxState, numbersCheckboxState, lowercaseCheckboxState, uppercaseCheckboxState) => {
    //si no ponía una variable no me enviaba el false o true, ni me dejaba poner un return. Así es como se hace?
    let buttonDissabled = null
    symbolsCheckboxState || numbersCheckboxState || lowercaseCheckboxState || uppercaseCheckboxState 
    ? buttonDissabled = false : buttonDissabled = true

    return buttonDissabled
}

const defineCharactersInPassword = (symbolsCheckboxState, numbersCheckboxState, lowercaseCheckboxState, uppercaseCheckboxState, setGeneratedPasswordButton, rangeBarValue) => {
    password = ''
    definedCharacters = ''

    if (symbolsCheckboxState) {
        definedCharacters += symbols
        password += symbols.charAt(generateAleatoryCharacter(symbols.length))}
    if (numbersCheckboxState) {
        definedCharacters += numbers
        password += numbers.charAt(generateAleatoryCharacter(numbers.length))}
    if (lowercaseCheckboxState) {
        definedCharacters += lowercase
        password += lowercase.charAt(generateAleatoryCharacter(lowercase.length))}
    if (uppercaseCheckboxState) {
        definedCharacters += uppercase
        password += uppercase.charAt(generateAleatoryCharacter(lowercase.length))
    }

    generatePassword(setGeneratedPasswordButton, rangeBarValue)
}

const generatePassword = (setGeneratedPasswordButton, rangeBarValue) => {

    for (let i = password.length; i < rangeBarValue; i++){
        password += definedCharacters.charAt(generateAleatoryCharacter(definedCharacters.length))
    }
    
    setGeneratedPasswordButton(password)
}


export default MainContent