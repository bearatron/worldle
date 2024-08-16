import { useEffect } from "react";
import { usePapaParse } from "react-papaparse";

function Test() {
  const { readString } = usePapaParse();

  useEffect(() => {
    async function test() {
      const coordsResponse = await csvCountryCoords();
      const coords = coordsResponse.data;

      const shapesResponse = await csvShapeList();
      const shapes = shapesResponse.data;
      console.log("countries with coords but not shapes");

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
          console.log(coords[i].country);
        }
      }

      console.log("countries with shapes but not coords");

      for (let i = 0; i < shapes.length; i++) {
        let match = false;
        for (let j = 0; j < coords.length; j++) {
          if (shapes[i].abbreviation === coords[j].country.toLowerCase()) {
            match = true;
            break;
          }
        }
        if (match) {
          continue;
        } else {
          console.log(shapes[i].abbreviation);
        }
      }
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

    test();
  });
  return (
    <>
      <p>beep boop testing</p>
    </>
  );
}

export default Test;
