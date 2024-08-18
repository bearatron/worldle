import { useState } from "react";
import "./GuessInput.css";
import Select from "react-select";

function GuessInput({ addGuess, countryList }) {
  const [guess, setGuess] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  function generateOptions() {
    const options = [];

    for (let i = 0; i < countryList.length; i++) {
      options.push({ value: countryList[i], label: countryList[i].name });
    }

    return options;
  }

  function handleSubmit(newVal) {
    // console.log(newVal);
    // e.preventDefault();
    // console.log(`submitted guess: ${newVal.label}`);
    try {
      addGuess(newVal.label);
      // setGuess("");
    } catch (error) {
      setErrorMsg(error.message);
    }
  }

  return (
    <>
      {/* <form className="guess-form" onSubmit={handleSubmit}>
        <input
          className="guess-form__text-input"
          style={{
            border: errorMsg.length > 0 ? "1px solid red" : "",
          }}
          type="text"
          value={guess}
          onChange={(e) => {
            setGuess(e.target.value);
            setErrorMsg("");
          }}
        />
        <input
          className="guess-form__submit-button"
          type="submit"
          value="Guess"
        />
      </form>

      <p className="error-text">{errorMsg.length > 0 ? errorMsg : ""}</p> */}

      <Select
        options={generateOptions()}
        onChange={(newVal) => handleSubmit(newVal)}
        className="guess-form__text-input"
        placeholder="Select a country/territory..."
        menuPlacement="auto"
        // unstyled={true}
        // ref={null}
      />
    </>
  );
}

export default GuessInput;
