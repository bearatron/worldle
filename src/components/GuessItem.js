function GuessItem({ name, distance, percentage }) {
  return (
    <>
      <p>
        Name: {name}, Distance: {distance}, {percentage}
      </p>
      {/* {console.log(key)} */}
    </>
  );
}

export default GuessItem;
