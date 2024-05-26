const colors = [
  {
    name: "red",
    hex: "#ff0000",
  },
  {
    name: "orange",
    hex: "#ff6600",
  },
  {
    name: "yellow",
    hex: "#fbfb00",
  },
  {
    name: "blue",
    hex: "#006ca5",
  },
  {
    name: "green",
    hex: "#4acf50",
  },
  {
    name: "pink",
    hex: "#ff8fad",
  },
  {
    name: "purple",
    hex: "#c154c1",
  },
  {
    name: "pastel",
    hex: "#fcf5c",
  },
];

export default function getRandomColor() {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}
