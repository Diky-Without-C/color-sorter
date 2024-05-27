export default function Glass({ className, liquid, onClick }) {
  return (
    <div
      {...{ onClick }}
      className={`${className} flex h-52 w-20 flex-col-reverse overflow-hidden rounded-b-full border-2 border-white transition-all duration-300`}
    >
      {liquid?.map((color, index) => {
        return (
          <div key={index} className={`${color.value} h-1/6 w-full`}></div>
        );
      })}
    </div>
  );
}