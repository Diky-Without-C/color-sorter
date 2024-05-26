export default function shuffleArray(array) {
  const flatMap = array.flat();
  flatMap.sort(() => Math.random() - 0.5);

  const result = [];
  const chunkSize = flatMap.length / array.length;
  for (let i = 0; i < array.length; i++) {
    const startIndex = i * chunkSize;
    const endIndex = startIndex + chunkSize;
    const subArray = flatMap.slice(startIndex, endIndex);
    result.push(subArray);
  }

  return result;
}
