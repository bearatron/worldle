import { getCodes } from "iso-3166-1-alpha-2";
import "./App.css";

function App() {
  function randomCountry() {
    let codes = getCodes();
    return codes[randomFromInterval(0, codes.length)].toLowerCase();
  }

  function randomFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  return (
    <div className="App">
      <p>Hello world</p>
      <img
        src={require(`./shapes/${randomCountry()}/512.png`)}
        alt="Mystery Country Shape"
      />
    </div>
  );
}

export default App;
