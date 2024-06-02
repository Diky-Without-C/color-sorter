import { useState, useEffect } from "react";
import Glass from "./components/glass";
import getRandomColor from "./utils/get-random-color";
import shuffleArray from "./utils/shuffle";
import "./services/global.css";

export default function App() {
  const [liquids, setLiquids] = useState([[], [], [], [], [], [], [], []]);
  const [selectedGlassIndex, setSelectedGlassIndex] = useState(null);
  const [pouring, setPouring] = useState(null);
  const [moveTo, setMoveTo] = useState("");

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

  function handleAnimation(current, target) {
    moveGlass(current, target);
    setPouring(current);
    setTimeout(() => {
      setPouring(null);
    }, 500);
  }

  function handleClick(index) {
    let isFull = liquids[index].length == 6;

    if (selectedGlassIndex == index) {
      setSelectedGlassIndex(null);
      return;
    }

    if (selectedGlassIndex != index) {
      if (!isFull) {
        if (typeof selectedGlassIndex == "number") {
          const lastIndex = liquids[selectedGlassIndex].pop();
          liquids[index].push(lastIndex);
          setSelectedGlassIndex(null);

          handleAnimation(selectedGlassIndex, index);
          return;
        }
      }
    }

    setSelectedGlassIndex(index);
  }

  function moveGlass(current, target) {
    const currentIsOnTop = current <= 3;
    const targetIsOnTop = target <= 3;

    let result = "";

    if (currentIsOnTop && !targetIsOnTop) {
      current += 4;
      result += `translate-y-1/2 `;
    } else if (!currentIsOnTop && targetIsOnTop) {
      current -= 4;
      result += `-translate-y-2full `;
    } else {
      result += `-translate-y-3/4 `;
    }

    const delta = Math.abs(target - current);
    if (current < target) {
      result += `rotate-90 `;

      switch (delta) {
        case 1:
          result += `-translate-x-1/3 `;
          break;
        case 2:
          result += `translate-x-full `;
          break;
        case 3:
          result += `translate-x-2full `;
          break;
      }
    } else {
      result += "-rotate-90 ";

      switch (delta) {
        case 1:
          result += `translate-x-1/3 `;
          break;
        case 2:
          result += `-translate-x-full `;
          break;
        case 3:
          result += `-translate-x-2full `;
          break;
        default:
          result += `translate-x-1/2full `;
      }
    }

    setMoveTo(result);
  }

  useEffect(() => {
    handleSetLiquid();
  }, []);

  return (
    <main className="flex h-screen w-full items-end justify-center bg-black">
      <div className="mb-5 grid w-10/12 grid-cols-4 gap-x-5 gap-y-12 md:w-4/12">
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
