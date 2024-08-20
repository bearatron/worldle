function CountryShape({ countryCode }) {
  const imagePath = `./shapes/${countryCode.toLowerCase()}/vector.svg`;

  return (
    <>
      <img src={imagePath} width="256px" alt="mystery country shape" />
    </>
  );
}

export default CountryShape;
