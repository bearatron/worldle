import "./NextGameButton.css";

function NextGameButton({ resetGame }) {
  return (
    <button className="next-game-button" onClick={resetGame} type="button">
      Next Game
    </button>
  );
}

export default NextGameButton;
