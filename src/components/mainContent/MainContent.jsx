import { useState } from 'react'
import styles from './mainContainer.module.css'

const MainContent = () => {
    const minLength = 4
    const maxLength = 32

    const [inputValue, setInputValue] = useState(minLength)

    const [buttonValue, setButtonValue] = useState(true)
    const [symbolsCheckbox, setSymbolsCheckbox] = useState(false)
    // const [numbersCheckbox, setNumbersCheckbox] = useState(false)
    // const [lowercaseCheckbox, setLowercaseCheckbox] = useState(false)
    // const [uppercaseCheckbox, setUppercaseCheckbox] = useState(false)
    
    symbolsCheckbox ? setButtonValue(false) : setButtonValue(true)
    

    const passwordInputClass = 
    `${styles.passwordBlock} ${styles.passwordText}`
    const buttonClass = 
    `${styles.text} ${styles.generatePasswordButton}`

    return (
    <>
        <input type="text" placeholder="P4$5WORD!" readOnly className={passwordInputClass}/>
        <p>LENGTH: {inputValue}</p>
        <div className={styles.rangeComponentBar}>
          <span className={styles.text}>{minLength}</span>
          <input 
          type="range" 
          id="range-bar" 
          max={maxLength} 
          min={minLength} 
          value={inputValue}
          className={styles.rangeBar} 
          onChange={event => setInputValue(Number(event.target.value))} />
          <span className={styles.text}>{maxLength}</span>

        </div>
        <div className={styles.checkboxAll}>
          <div className={styles.checkboxGroup}>
            <p>Include Uppercase</p>
            <input className={styles.checkboxSwitch} type="checkbox" id="uppercase"
            // onChange={setUppercaseCheckbox(!uppercaseCheckbox)}
            />
            <label className={styles.switch} htmlFor="uppercase"></label>
          </div>
          <div className={styles.checkboxGroup}>
            <p>Include Lowercase</p>
            <input type="checkbox" id="lowercase" className={styles.checkboxSwitch}
            // onChange={setLowercaseCheckbox(!lowercaseCheckbox)} 
            />
            <label className={styles.switch}  htmlFor="lowercase"></label>
          </div>
          <div className={styles.checkboxGroup}>
            <p>Include Numbers</p>
            <input type="checkbox" id="numbers" className={styles.checkboxSwitch}
            // onChange={setNumbersCheckbox(!numbersCheckbox)} 
            />
            <label htmlFor="numbers" className={styles.switch} ></label>
          </div>
          <div className={styles.checkboxGroup}>
            <p>Include Symbols</p>
            <input type="checkbox" id="symbols" className={styles.checkboxSwitch} 
            onChange={() => setSymbolsCheckbox(!symbolsCheckbox)} />
            <label htmlFor="symbols" className={styles.switch} ></label>
          </div>
        </div>
        <button disabled={buttonValue} className={buttonClass}>Generate password</button>
    </>
    )
}

export default MainContent