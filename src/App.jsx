import { useState, useEffect } from "react";
import Tube from "./components/tube";
import getRandomColor from "./utils/get-random-color";
import shuffleArray from "./utils/shuffle";
import "./services/global.css";

export default function App() {
  const [tubes, setTubes] = useState([[], [], [], [], [], [], [], []]);
  const [selectedTubeIndex, setSelectedTubeIndex] = useState(null);
  const [pouring, setPouring] = useState(null);
  const [moveTo, setMoveTo] = useState("");

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

          setPouring(selectedTubeIndex);
          moveTube(selectedTubeIndex, index);
          setTimeout(() => {
            setPouring(null);
          }, 500);

          return;
        }
      }
    }

    setSelectedTubeIndex(index);
  }

  function moveTube(current, target) {
    let currentIsOnTop = current <= 3;
    let targetIsOnTop = target <= 3;
    console.log(current, target);
    let result = "";

    if (currentIsOnTop && targetIsOnTop) {
      result += "-translate-y-3/4 ";
    } else if (currentIsOnTop > targetIsOnTop) {
      result += "translate-y-2/4 ";
    } else if (currentIsOnTop < targetIsOnTop) {
      result += "-translate-y-[200%] ";
    } else {
      result += "-translate-y-3/4 ";
    }

    let delta = Math.abs(current - target) % 4;
    // console.log(delta);
    if (current > target) {
      result += `-translate-x-[${-50 + (delta - 1) * 150}%]`;
    } else {
      result += `translate-x-[${300 + (delta - 1) * 150}%]`;
    }

    setMoveTo(result);
  }

  useEffect(() => {
    handleSetTubes();
  }, []);
  // console.log(JSON.stringify(tubes, 0, 1));

  return (
    <main className="flex h-screen w-full items-end justify-center bg-black">
      <div className="mb-5 grid w-10/12 grid-cols-4 gap-x-5 gap-y-12 md:w-4/12">
        {tubes.map((tube, index) => {
          const isSelected = selectedTubeIndex == index;
          const isPouring = pouring == index;
          {
            return (
              <div key={index} className="flex justify-center">
                <Tube
                  onClick={() => handleClick(index)}
                  className={`${isSelected && "-translate-y-10"} ${isPouring && `-rotate-90`} ${isPouring ? moveTo : null}`}
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
