import GuessItem from "components/GuessItem";
import "./GuessList.css";

function GuessList({ maxGuesses, guessList }) {
  return (
    <ul className="guess-list">
      {guessList.map((guess) => (
        <GuessItem
          key={guess.id}
          name={guess.name}
          distance={guess.distance}
          direction={guess.direction}
          percentage={guess.percentage}
        />
      ))}
      {[...Array(maxGuesses - guessList.length)].map((val, index) => (
        <GuessItem key={guessList.length + index} empty={true} />
      ))}
    </ul>
  );
}

export default GuessList;
