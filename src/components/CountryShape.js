function CountryShape({ countryCode }) {
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

  const imagePath = `./shapes/${countryCode.toLowerCase()}/256.png`;

  return (
    <>
      {/* <img
        src={require(`shapes/${randomCountry()}/256.png`)}
        alt="Mystery Country Shape"
      /> */}
      <img src={imagePath} width="256px" alt="mystery country shape" />
    </>
  );
}

export default CountryShape;
