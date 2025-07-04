import { useState } from 'react';
import './App.css';

function App() {
  const [headCount, setHeadCount] = useState(0);
  const [tailCount, setTailCount] = useState(0);
  const [src, setSrc] = useState("/src/assets/rahul.jpg"); // No image initially
  const [isFlipping, setIsFlipping] = useState(false); // New state for animation

  const toss = () => {
    if (isFlipping) return; // Prevent multiple clicks
  
    setIsFlipping(true);
  
    // Start alternating image
    const images = ["/src/assets/rahul.jpg", "/src/assets/priya.jpg"];
    let i = 0;
  
    const flipInterval = setInterval(() => {
      setSrc(images[i % 2]);
      i++;
    }, 100); // alternate every 100ms
  
    // After 1.5s, stop alternating and show actual result
    setTimeout(() => {
      clearInterval(flipInterval); // stop flipping
  
      const num = Math.random();
      if (num > 0.5) {
        setHeadCount(headCount + 1);
        setSrc("/src/assets/rahul.jpg");
      } else {
        setTailCount(tailCount + 1);
        setSrc("/src/assets/priya.jpg");
      }
  
      setIsFlipping(false);
    }, 1500); // match your animation duration
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex flex-col items-center justify-center px-4">
      <div className="text-blue-600 text-center mb-6">
        <p className="text-5xl font-bold">🎲 Toss App</p>
      </div>

      <div className="text-3xl text-gray-800 mb-2">
        HEADS OR TAILS
      </div>

      <div className="text-lg text-gray-600 mb-4">
        Flip a coin to get the result
      </div>

      <div className="flex justify-center items-center gap-10 text-lg font-medium mb-6">
        <p className="text-blue-700">
          Heads: <span className="font-bold">{headCount}</span>
        </p>
        <p className="text-purple-700">
          Tails: <span className="font-bold">{tailCount}</span>
        </p>
      </div>

      <div className="bg-white h-[200px] w-[200px] rounded-full flex items-center justify-center shadow-lg mb-6 overflow-hidden text-4xl font-bold text-gray-400">
        {src ? (
          <img
            src={src}
            alt="Coin result"
            className={`h-full w-full object-cover rounded-full ${isFlipping ? "flip-animation" : ""}`}
          />
        ) : (
          "?"
        )}
      </div>

      <button
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow-lg transition duration-300 text-lg"
        onClick={toss}
        disabled={isFlipping} // Disable button during flip
      >
        {isFlipping ? "Flipping..." : "Flip The Coin"}
      </button>
    </div>
  );
}

export default App;
