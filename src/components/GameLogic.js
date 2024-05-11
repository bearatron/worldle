import CountryShape from "components/CountryShape";
import GuessList from "components/GuessList";
import GuessInput from "components/GuessInput";

function GameLogic() {
  const countriesGuessed = [
    { id: 1, name: "United States", distance: "10000km", percentage: "10%" },
    { id: 2, name: "Mexico", distance: "10000km", percentage: "10%" },
    { id: 3, name: "Panama", distance: "10000km", percentage: "10%" },
  ];

  return (
    <>
      <CountryShape />
      <GuessList guessList={countriesGuessed} />

      <GuessInput />
    </>
  );
}

export default GameLogic;
