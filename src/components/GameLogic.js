import CountryShape from "components/CountryShape";
import GuessList from "components/GuessList";
import GuessInput from "components/GuessInput";
import { useMemo, useState } from "react";
import { usePapaParse } from "react-papaparse";
import LatLon from "geodesy/latlon-spherical.js";
import { ReactP5Wrapper } from "@p5-wrapper/react";
import "./GameLogic.css";

function GameLogic() {
  const [countriesGuessed, setCountriesGuessed] = useState([]); // array of GuessItem components
  const [countryList, setCountryList] = useState([]); // array of country objects parsed from csv
  const [countryToGuess, setCountryToGuess] = useState({}); // country object parsed from csv
  const [guessObjs, setGuessObjs] = useState([]); // array of country objects parsed from csv
  const maxGuesses = 6;
  const mercatorMapWidth = 2058;
  const mercatorMapHeight = 2058;

  function addGuess(countryName) {
    let guessObj = {};

    for (let i = 0; i < countryList.length; i++) {
      if (countryList[i].name === countryName) {
        guessObj = countryList[i];
        break;
      }
    }

    if (Object.keys(guessObj).length === 0) {
      throw new Error("Country or territory does not exist");
    }

    setGuessObjs([...guessObjs, guessObj]);

    console.log(guessObj);
    console.log(countryToGuess);
    console.log("logging distance");

    const guess = new LatLon(guessObj.latitude, guessObj.longitude);
    const answer = new LatLon(
      countryToGuess.latitude,
      countryToGuess.longitude
    );

    const distance = guess.distanceTo(answer); // in meters

    const halfEarthCircumference = 40075e3 / 2;
    const unroundedPercentage =
      ((halfEarthCircumference - distance) / halfEarthCircumference) * 100;

    let percentage;

    if (
      Math.round(unroundedPercentage) === 100 &&
      unroundedPercentage !== 100
    ) {
      percentage = 99;
    } else {
      percentage = Math.round(unroundedPercentage);
    }

    console.log(
      ((halfEarthCircumference - distance) / halfEarthCircumference) * 100
    );

    const bearing = trueBearing(
      toCoords(guessObj.latitude, guessObj.longitude),
      toCoords(countryToGuess.latitude, countryToGuess.longitude)
    );

    setCountriesGuessed([
      ...countriesGuessed,
      {
        id: countriesGuessed.length,
        name: countryName,
        distance: `${Math.round(LatLon.metresToKm * distance)} km`,
        direction: bearing,
        percentage: `${percentage}%`,
      },
    ]);
  }

  const sketch = (p5) => {
    p5.setup = () => {
      p5.createCanvas(2058, 2058);
    };

    console.log("sketch!");

    p5.draw = () => {
      p5.noStroke();
      p5.translate(p5.width / 2, p5.height / 2);
      p5.scale(1, -1);
      p5.fill(255, 0, 0);

      p5.circle(0, 0, 20);

      p5.stroke(0);
      p5.strokeWeight(1);
      p5.fill(255);

      for (let i = 0; i < countryList.length; i++) {
        let x = toCoords(countryList[i].latitude, countryList[i].longitude).x;
        let y = toCoords(countryList[i].latitude, countryList[i].longitude).y;
        p5.circle(x, y, 2);

        p5.push();
        p5.scale(1, -1);
        p5.text(countryList[i].name, x, -y);
        p5.pop();
      }
    };
  };

  function trueBearing(p1, p2) {
    const p2West = { x: p2.x - mercatorMapWidth, y: p2.y };
    const p2East = { x: p2.x + mercatorMapWidth, y: p2.y };

    // finds whether the shortest distance involves "wrapping around" the map
    // (probably not 100% accurate since euclidean distance on a mercator projection of the world
    // does not equal actual distance between two points on earth)
    if (euclideanDistance(p1, p2West) < euclideanDistance(p1, p2)) {
      p2.x = p2West.x;
    } else if (euclideanDistance(p1, p2East) < euclideanDistance(p1, p2)) {
      p2.x = p2East.x;
    }

    const vec1 = { x: 0, y: 1 };
    const vec2 = { x: p2.x - p1.x, y: p2.y - p1.y };

    const dotProduct = vec1.x * vec2.x + vec1.y * vec2.y;
    const vec1Magnitude = Math.sqrt(Math.pow(vec1.x, 2) + Math.pow(vec1.y, 2));
    const vec2Magnitude = Math.sqrt(Math.pow(vec2.x, 2) + Math.pow(vec2.y, 2));

    // in degrees
    const angle =
      (Math.acos(dotProduct / (vec1Magnitude * vec2Magnitude)) * 180) / Math.PI;

    if (p1.x < p2.x) {
      return angle;
    }

    return 360 - angle;
  }

  function euclideanDistance(p1, p2) {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
  }

  function toCoords(latitude, longitude) {
    // code modified from https://stackoverflow.com/a/14457180
    // produces a 2d coordinate on the cartesian plane using the mercator projection
    // 0 latitude and 0 longitude produces (0, 0)

    const mapWidth = mercatorMapWidth;
    const mapHeight = mercatorMapHeight;

    // get x value
    const x = longitude * (mapWidth / 360);

    // convert from degrees to radians
    const latRad = (latitude * Math.PI) / 180;

    // get y value
    const mercN = Math.log(Math.tan(Math.PI / 4 + latRad / 2));
    const y = (mapHeight * mercN) / (2 * Math.PI);

    return { x: x, y: y };
  }

  function resetGame() {
    setCountriesGuessed([]);
    setCountryToGuess(
      countryList[Math.floor(Math.random() * countryList.length)].country
    );
  }

  const { readString } = usePapaParse();

  useMemo(() => {
    async function setup() {
      const coordsResponse = await csvCountryCoords();
      const coords = coordsResponse.data;

      const shapesResponse = await csvShapeList();
      const shapes = shapesResponse.data;

      const filteredCoords = coords.filter(
        (e) => !invalidCountries(coords, shapes).includes(e.country)
      );

      formatCountryList(filteredCoords);

      const randomCountryObj =
        filteredCoords[Math.floor(Math.random() * filteredCoords.length)];

      setCountryList(filteredCoords);
      // setCountryToGuess(randomCountryObj);

      setCountryToGuess({
        country: "WF",
        latitude: -13.768752,
        longitude: -177.156097,
        name: "Wallis and Futuna",
      });
    }

    function formatCountryList(list) {
      for (let i = 0; i < list.length; i++) {
        list[i].latitude = Number(list[i].latitude);
        list[i].longitude = Number(list[i].longitude);
      }
    }

    function invalidCountries(coords, shapes) {
      // finding countries with coords but not shapes
      let noShapes = [];

      for (let i = 0; i < coords.length; i++) {
        let match = false;
        for (let j = 0; j < shapes.length; j++) {
          if (coords[i].country.toLowerCase() === shapes[j].abbreviation) {
            match = true;
            break;
          }
        }
        if (match) {
          continue;
        } else {
          noShapes.push(coords[i].country);
        }
      }

      return noShapes;

      // finding countries with shapes but not coords
      // let noCoords = [];

      // for (let i = 0; i < shapes.length; i++) {
      //   let match = false;
      //   for (let j = 0; j < coords.length; j++) {
      //     if (shapes[i].abbreviation === coords[j].country.toLowerCase()) {
      //       match = true;
      //       break;
      //     }
      //   }
      //   if (match) {
      //     continue;
      //   } else {
      //     noCoords.push(shapes[i].abbreviation);
      //   }
      // }
    }

    async function csvCountryCoords() {
      const csv = await fetch("./countryCoords.csv").then((res) => res.text());

      return new Promise((resolve, reject) => {
        readString(csv, {
          worker: true,
          header: true,
          comments: "//",
          complete: (results) => {
            resolve(results);
          },
          error: (err) => {
            reject(err);
          },
        });
      });
    }

    async function csvShapeList() {
      const csv = await fetch("./shapeList.csv").then((res) => res.text());

      return new Promise((resolve, reject) => {
        readString(csv, {
          worker: true,
          header: true,
          comments: "//",
          complete: (results) => {
            resolve(results);
          },
          error: (err) => {
            reject(err);
          },
        });
      });
    }

    setup();
  }, [readString]);

  if (Object.keys(countryToGuess).length === 0) {
    return <p>loading...</p>;
  }

  return (
    <div className="game-logic">
      {console.log("country to guess:")} {console.log(countryToGuess)}
      <CountryShape countryCode={countryToGuess.country} />
      <GuessList maxGuesses={maxGuesses} guessList={countriesGuessed} />
      {countriesGuessed.length < maxGuesses ? (
        <GuessInput addGuess={addGuess} countryList={countryList} />
      ) : (
        <></>
      )}
      {/* <div className="map-bounding-box">
        <div className="country-labels">
          <ReactP5Wrapper sketch={sketch} />
        </div>
        <img
          src="./mercator.jpeg"
          className="mercator-img"
          alt="world map mercator projection"
        ></img>
      </div> */}
      {/* {console.log(countryList)} */}
    </div>
  );
}

export default GameLogic;
