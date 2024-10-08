import DirectionImage from "./DirectionImage";
import "./GuessItem.css";

function GuessItem({ name, distance, direction, percentage, empty = false }) {
  return empty ? (
    <div className="guess-item-empty"></div>
  ) : (
    <div className="guess-item">
      <div className="guess-item__name">{name}</div>
      <div className="guess-item__distance">{distance}</div>
      <div className="guess-item__direction">
        <DirectionImage bearing={direction} />
      </div>
      <div className="guess-item__percentage">{percentage}</div>
    </div>
  );
}

export default GuessItem;
