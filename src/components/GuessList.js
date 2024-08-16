import GuessItem from "components/GuessItem";
import "./GuessList.css";

function GuessList({ guessList }) {
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
    </ul>
  );
}

export default GuessList;
