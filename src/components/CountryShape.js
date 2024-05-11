// import { getCodes } from "iso-3166-1-alpha-2";

function CountryShape() {
  // function randomCountry() {
  //   let codes = getCodes();
  //   return codes[randomFromInterval(0, codes.length)].toLowerCase();
  // }

  // function randomFromInterval(min, max) {
  //   // min and max included
  //   return Math.floor(Math.random() * (max - min + 1) + min);
  // }

  // function countriesWithoutSVGs() {
  //   getCodes();
  //   console.log();
  // }

  return (
    <>
      {/* <img
        src={require(`shapes/${randomCountry()}/256.png`)}
        alt="Mystery Country Shape"
      /> */}
      <img src={require(`shapes/ca/256.png`)} alt="Mystery Country Shape" />
    </>
  );
}

export default CountryShape;
