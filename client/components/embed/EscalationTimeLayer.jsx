import { useEffect, useState } from "react";

function EscalationOverlay({ escalated, onTimeout }) {
  const [timeLeft, setTimeLeft] = useState(60); // 10 min = 600 sec

  useEffect(() => {
    if (!escalated) return;

    setTimeLeft(60); // reset every time escalated becomes true

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onTimeout(); // 🔥 trigger your function
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [escalated]);

  // format mm:ss
  const formatTime = (t) => {
    const min = Math.floor(t / 60);
    const sec = t % 60;
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  if (!escalated) return null;

  return (
    <div className="absolute f-full w-full inset-0 flex justify-center items-center">
      <div className="absolute inset-0 backdrop-blur-md flex flex-col gap-2 justify-center items-center h-full w-full bg-black/20 text-white text-center">
        
        <p>Waiting for the user to join the chat</p>

        {/* ⏳ Timer */}
        <p className="text-2xl font-bold">
          {formatTime(timeLeft)}
        </p>

      </div>
    </div>
  );
}

export default EscalationOverlay;