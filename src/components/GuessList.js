import GuessItem from "components/GuessItem";
function GuessList({ guessList }) {
  return (
    <>
      <ul>
        {guessList.map((guess) => (
          <GuessItem
            key={guess.id}
            name={guess.name}
            distance={guess.distance}
            percentage={guess.percentage}
          />
        ))}
      </ul>
    </>
  );
}

export default GuessList;
