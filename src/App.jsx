import { useState, useEffect, useRef } from "react";
import Glass from "./components/glass";
import getRandomColor from "./utils/get-random-color";
import shuffleArray from "./utils/shuffle";
import "./services/global.css";

export default function App() {
  const [liquids, setLiquids] = useState([[], [], [], [], [], [], [], []]);
  const [selectedGlassIndex, setSelectedGlassIndex] = useState(null);
  const [pouring, setPouring] = useState(null);
  const [moveTo, setMoveTo] = useState("");
  const glassRef = useRef(null);

  function handleSetLiquid() {
    let result = [];
    for (let i = 0; i < liquids.length - 1; i++) {
      let array = [];
      const randomColor = getRandomColor();

      for (let j = 0; j < 6; j++) {
        array.push(randomColor);
      }
      result.push(array);
    }

    result = shuffleArray(result);
    result.push([]); // add  1 more for empty glass

    setLiquids(result);
  }

  function handleClick(index) {
    let isFull = liquids[index].length == 6;

    if (selectedGlassIndex != index) {
      if (!isFull) {
        if (selectedGlassIndex !== null) {
          const lastIndex = liquids[selectedGlassIndex].pop();
          liquids[index].push(lastIndex);
          setSelectedGlassIndex(null);

          moveTube(selectedGlassIndex, index);
          setPouring(selectedGlassIndex);
          setTimeout(() => {
            setPouring(null);
          }, 500);

          return;
        }
      }
    }

    setSelectedGlassIndex(index);
  }

  function moveTube(current, target) {
    let currentIsOnTop = current <= 3;
    let targetIsOnTop = target <= 3;
    let result = "";

    let newCurrent = current;
    if (currentIsOnTop && !targetIsOnTop) {
      newCurrent = current + 4;
    } else if (!currentIsOnTop && targetIsOnTop) {
      newCurrent = current - 4;
    }

    result += newCurrent < target ? "rotate-90" : "-rotate-90";

    setMoveTo(result);
  }

  useEffect(() => {
    handleSetLiquid();
    console.log(glassRef.current?.children);
  }, []);

  return (
    <main className="flex h-screen w-full items-end justify-center bg-black">
      <div
        ref={glassRef}
        className="mb-5 grid w-10/12 grid-cols-4 gap-x-5 gap-y-12 md:w-4/12"
      >
        {liquids.map((liquid, index) => {
          const isSelected = selectedGlassIndex == index;
          const isPouring = pouring == index;
          {
            return (
              <div key={index} className="flex justify-center">
                <Glass
                  onClick={() => handleClick(index)}
                  className={`${isSelected && "-translate-y-10"} ${isPouring && moveTo}`}
                  {...{ liquid }}
                />
              </div>
            );
          }
        })}
      </div>
    </main>
  );
}
