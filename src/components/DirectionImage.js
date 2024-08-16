import { useEffect, useState } from "react";

function DirectionImage({ bearing }) {
  const [path, setPath] = useState("");

  useEffect(() => {
    function determinePath() {
      // how many degrees above/below a cardinal direction to still have that same direction emoji
      // eg. a bearing of 10 degrees would still have the ⬆️ emoji
      const deviation = 15;

      if (isNaN(bearing)) {
        return "./tada.png"; // 🎉
      }

      if (bearing < deviation) {
        return "./arrow_up.png"; // ⬆️
      } else if (bearing < 90 - deviation) {
        return "./arrow_upper_right.png"; // ↗️
      } else if (bearing < 90 + deviation) {
        return "./arrow_right.png"; // ➡️
      } else if (bearing < 180 - deviation) {
        return "./arrow_lower_right.png"; // ↘️
      } else if (bearing < 180 + deviation) {
        return "./arrow_down.png"; // ⬇️
      } else if (bearing < 270 - deviation) {
        return "./arrow_lower_left.png"; // ↙️
      } else if (bearing < 270 + deviation) {
        return "./arrow_left.png"; // ⬅️
      } else if (bearing < 360 - deviation) {
        return "./arrow_upper_left.png"; // ↖️
      } else {
        return "./arrow_up.png"; // ⬆️
      }
    }
    setPath(determinePath());
  }, [bearing]);

  return <img src={path} height="50%" alt="mystery country" />;
}

export default DirectionImage;
