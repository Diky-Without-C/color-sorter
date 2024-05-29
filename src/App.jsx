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
  const [glasses, setGlasses] = useState(null);
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

          moveGlass(selectedGlassIndex, index);
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

  function moveGlass(current, target) {
    const currentIsOnTop = current <= 3;
    const targetIsOnTop = target <= 3;

    let result = "";

    if (currentIsOnTop && !targetIsOnTop) {
      current += 4;
      result += `translate-y-[50%] `;
    } else if (!currentIsOnTop && targetIsOnTop) {
      current -= 4;
      result += `-translate-y-[200%] `;
    } else {
      result += `-translate-y-[75%] `;
    }

    const delta = Math.abs(target - current);
    let offsetX;
    switch (delta) {
      case 1:
        offsetX = -50;
        break;
      case 2:
        offsetX = 100;
        break;
      case 3:
        offsetX = 200;
        break;
    }

    if (current < target) {
      result += `rotate-90 translate-x-[${offsetX}%]`;
    } else {
      result += `-rotate-90 ${offsetX ? `-translate-x-[${offsetX}%]` : "translate-x-[200%]"}`;
    }

    setMoveTo(result);
  }

  useEffect(() => {
    handleSetLiquid();

    if (glassRef.current) {
      setGlasses([...glassRef.current.children]);
    }
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
