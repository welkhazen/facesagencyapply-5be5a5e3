import { useState, useEffect } from "react";

interface LogoAnimationProps {
  onComplete: () => void;
}

const LogoAnimation = ({ onComplete }: LogoAnimationProps) => {
  const [visibleLetters, setVisibleLetters] = useState(0);
  const [showFlash, setShowFlash] = useState(false);
  const [flashPhase, setFlashPhase] = useState<"off" | "in" | "hold" | "out">("off");
  
  // "faces" in lowercase with last 's' in red
  const letters = [
    { char: "f", isRed: false },
    { char: "a", isRed: false },
    { char: "c", isRed: false },
    { char: "e", isRed: false },
    { char: "s", isRed: true },
  ];

  useEffect(() => {
    // Type in letters one by one (slower - 300ms per letter)
    const letterInterval = setInterval(() => {
      setVisibleLetters((prev) => {
        if (prev < letters.length) {
          return prev + 1;
        }
        return prev;
      });
    }, 300);

    // After all letters, start flash sequence
    const flashInTimeout = setTimeout(() => {
      clearInterval(letterInterval);
      setShowFlash(true);
      setFlashPhase("in");
    }, letters.length * 300 + 800);

    // Flash reaches full white
    const flashHoldTimeout = setTimeout(() => {
      setFlashPhase("hold");
    }, letters.length * 300 + 1100);

    // Complete - transition to home page while screen is white
    const completeTimeout = setTimeout(() => {
      onComplete();
    }, letters.length * 300 + 1400);

    return () => {
      clearInterval(letterInterval);
      clearTimeout(flashInTimeout);
      clearTimeout(flashHoldTimeout);
      clearTimeout(completeTimeout);
    };
  }, [onComplete, letters.length]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground">
      {/* Camera Flash Effect - covers entire screen */}
      {showFlash && (
        <div 
          className={`absolute inset-0 bg-background pointer-events-none transition-opacity duration-300 ${
            flashPhase === "in" ? "opacity-0" : "opacity-100"
          }`}
          style={{
            animation: flashPhase === "in" ? "flashIn 0.3s ease-out forwards" : undefined
          }}
        />
      )}

      {/* Logo Letters */}
      <div className="flex items-center justify-center gap-0">
        {letters.map((letter, index) => (
          <span
            key={index}
            className={`text-7xl md:text-9xl font-bold tracking-wider ${
              index < visibleLetters ? "animate-type-in" : "opacity-0"
            } ${letter.isRed ? "text-primary" : "text-background"}`}
            style={{
              animationDelay: `${index * 0.12}s`,
              fontFamily: "'Bebas Neue', sans-serif",
            }}
          >
            {letter.char}
          </span>
        ))}
      </div>
    </div>
  );
};

export default LogoAnimation;