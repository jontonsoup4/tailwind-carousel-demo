import clsx from 'clsx';
import Carousel from 'components/Carousel';

const colors = [
  'bg-red-500',
  'bg-yellow-500',
  'bg-green-500',
  'bg-blue-500',
  'bg-indigo-500',
  'bg-purple-500',
  'bg-pink-500',
  'bg-gray-500',
];

const Home = () => {
  const arr = Array.from({ length: 8 }, (_, i) => i + 1);
  const cards = arr.map((i) => (
    <div
      className={clsx(
        'flex flex-[1_0_auto] items-center justify-center snap-start w-full h-full text-5xl select-none',
        colors[i % colors.length],
      )}
      key={`${i}`}
    >
      {i}
    </div>
  ));

  return (
    <div className="flex flex-col items-center px-4 gap-y-4 h-full w-full">
      <h1 className="text-6xl font-bold text-center p-4">Tailwind Carousel</h1>
      <p className="mb-8 text-center">Scroll, drag, or tap the arrows to navigate through the cards</p>
      <div className="flex flex-col items-center gap-y-8">
        <div className="flex flex-col items-center gap-y-2">
          <h2 className="text-4xl font-bold text-center">Standard Carousel</h2>
          <Carousel cards={cards} />
        </div>
        <div className="flex flex-col items-center gap-y-2">
          <h2 className="text-4xl font-bold text-center">Wrap Around Carousel</h2>
          <Carousel cards={cards} wrap />
        </div>
      </div>
    </div>
  );
};

export default Home;
