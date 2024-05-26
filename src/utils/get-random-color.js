const colors = [
  {
    name: "red",
    value: "bg-[#ff0000]",
  },
  {
    name: "orange",
    value: "bg-[#ff6600]",
  },
  {
    name: "yellow",
    value: "bg-[#fbfb00]",
  },
  {
    name: "blue",
    value: "bg-[#006ca5]",
  },
  {
    name: "green",
    value: "bg-[#4acf50]",
  },
  {
    name: "pink",
    value: "bg-[#ff8fad]",
  },
  {
    name: "purple",
    value: "bg-[#c154c1]",
  },
  {
    name: "pastel",
    value: "bg-[#fcf5c1]",
  },
];

export default function getRandomColor() {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}
