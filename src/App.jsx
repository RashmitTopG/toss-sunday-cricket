import { useState } from 'react';
import './App.css';
import katheImage from "./assets/kathe.jpeg"
import ishaanImage from "./assets/ishaan.jpeg"
const images = [ishaanImage, katheImage];


function App() {
  const [headCount, setHeadCount] = useState(0);
  const [tailCount, setTailCount] = useState(0);
  const [src, setSrc] = useState(images[0]);
  const [isFlipping, setIsFlipping] = useState(false);
  const flipSound = new Audio('/src/assets/flip.wav');

  const toss = () => {
    if (isFlipping) return;

    setIsFlipping(true);
    flipSound.play();
    let i = 0;

    const flipInterval = setInterval(() => {
      setSrc(images[i % 2]);
      i++;
    }, 100);

    setTimeout(() => {
      clearInterval(flipInterval);

      const num = Math.random();
      if (num > 0.5) {
        setHeadCount(prev => prev + 1);
        setSrc(ishaanImage);
      } else {
        setTailCount(prev => prev + 1);
        setSrc(katheImage);
      }

      setIsFlipping(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#dbeafe] via-purple-100 to-pink-100 px-4 ">
      <h1 className="text-[2rem] sm:text-7xl font-extrabold text-indigo-700 pb-6 drop-shadow-md text-center">
        🎲 Toss Simulator 🎲
      </h1>
      <p className="text-2xl sm:text-4xl text-gray-700  pb-q mb-2 text-center">Heads or Tails</p>
      <p className="text-md sm:text-lg text-gray-600 mb-8 text-center">
        Flip a coin and test your luck!
      </p>

      <div className="flex gap-10 sm:gap-20 mb-8">
        <div className="text-center">
          <p className="text-base sm:text-lg text-gray-700">Heads</p>
          <p className="text-2xl sm:text-3xl font-bold text-indigo-700">{headCount}</p>
        </div>
        <div className="text-center">
          <p className="text-base sm:text-lg text-gray-700">Tails</p>
          <p className="text-2xl sm:text-3xl font-bold text-pink-700">{tailCount}</p>
        </div>
      </div>

      <div
        className={`relative w-40 h-40 sm:w-52 sm:h-52 rounded-full border-8 border-red-100 shadow-2xl overflow-hidden mb-8 bg-gradient-to-br from-indigo-100 to-purple-100 ${
          isFlipping ? 'animate-spin-slow' : ''
        }`}
      >
        {src ? (
          <img
            src={src}
            alt="Coin"
            className="h-full w-full object-cover rounded-full"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-5xl sm:text-6xl text-gray-400">?</div>
        )}
      </div>

      <button
        onClick={toss}
        disabled={isFlipping}
        className={`px-6 sm:px-8 py-3 rounded-full text-base sm:text-lg font-semibold transition duration-300 shadow-md ${
          isFlipping
            ? 'bg-gray-400 cursor-not-allowed text-gray-100'
            : 'bg-indigo-600 hover:bg-indigo-700 text-white'
        }`}
      >
        {isFlipping ? 'Flipping...' : 'Flip The Coin'}
      </button>

      <footer className="mt-10 text-sm text-gray-500">
        Made with ❤️ RashmitTopG
      </footer>
    </div>
  );
}

export default App;
