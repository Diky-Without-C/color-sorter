export default function Glass({ className, liquid, onClick }) {
  const isFull = liquid.length == 6;
  const isOneTypeColor = isFull && new Set(liquid).length == 1;

  return (
    <div
      {...{ onClick }}
      className={`${className} flex h-52 w-20 flex-col items-center transition-all duration-300 ${isOneTypeColor && "ring-2 ring-blue-500"}`}
    >
      <div className="h-6 w-full translate-y-1.5 scale-[1.15] rounded-b-3xl rounded-t-lg border-2 border-white border-b-transparent"></div>
      <div
        className={`flex h-full w-full flex-col-reverse overflow-x-hidden rounded-b-full border-2 border-t-0 border-white`}
      >
        {liquid?.map((color, index) => {
          return (
            <div key={index} className={`${color.value} h-1/6 w-full`}></div>
          );
        })}
      </div>
    </div>
  );
}
