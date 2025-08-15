import { useEffect, useState } from "react";

interface ConfettiAnimationProps {
  isVisible: boolean;
  duration?: number;
}

export default function ConfettiAnimation({
  isVisible,
  duration = 3000,
}: ConfettiAnimationProps) {
  const [confetti, setConfetti] = useState<
    Array<{ id: number; x: number; delay: number; color: string }>
  >([]);

  useEffect(() => {
    if (isVisible) {
      const pieces = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 3000,
        color: ["#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#06B6D4"][
          Math.floor(Math.random() * 5)
        ],
      }));

      setConfetti(pieces);

      const timer = setTimeout(() => {
        setConfetti([]);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration]);

  if (!isVisible || confetti.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="absolute w-3 h-3 opacity-80"
          style={{
            left: `${piece.x}%`,
            backgroundColor: piece.color,
            animation: `confetti-fall 3s linear forwards`,
            animationDelay: `${piece.delay}ms`,
            clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
          }}
        />
      ))}

      <style jsx>{`
        @keyframes confetti-fall {
          0% {
            top: -10px;
            transform: rotate(0deg);
          }
          100% {
            top: 100vh;
            transform: rotate(720deg);
          }
        }
      `}</style>
    </div>
  );
}
