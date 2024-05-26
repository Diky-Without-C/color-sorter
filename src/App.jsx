import { useState, useEffect } from "react";
import Tube from "./components/tube";
import getRandomColor from "./utils/get-random-color";
import shuffleArray from "./utils/shuffle";

export default function App() {
  const [tubes, setTubes] = useState([[], [], [], [], [], [], [], []]);
  const [selectedTubeIndex, setSelectedTubeIndex] = useState(null);

  function handleSetTubes() {
    let result = [];
    for (let i = 0; i < tubes.length - 1; i++) {
      let array = [];
      const randomColor = getRandomColor();
      for (let j = 0; j < 6; j++) {
        array.push(randomColor);
      }
      result.push(array);
    }

    result = shuffleArray(result);
    result.push([]); // add  1 more for empty tube

    setTubes(result);
  }

  function handleClick(index) {
    let isFull = tubes[index].length == 6;

    if (selectedTubeIndex != index) {
      if (!isFull) {
        if (selectedTubeIndex !== null) {
          const lastIndex = tubes[selectedTubeIndex].pop();
          tubes[index].push(lastIndex);
          setSelectedTubeIndex(null);
          return;
        }
      }
    }

    setSelectedTubeIndex(index);
  }

  useEffect(() => {
    handleSetTubes();
  }, []);
  // console.log(JSON.stringify(tubes, 0, 1));

  return (
    <main className="flex h-screen w-full items-end justify-center bg-black">
      <div className="mb-5 grid w-10/12 grid-cols-4 gap-x-5 gap-y-12 md:w-4/12">
        {tubes.map((tube, index) => {
          {
            return (
              <div key={index} className="flex justify-center">
                <Tube
                  onClick={() => handleClick(index)}
                  className={selectedTubeIndex == index && "-translate-y-10"}
                  {...{ tube }}
                />
              </div>
            );
          }
        })}
      </div>
    </main>
  );
}
