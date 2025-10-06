import { useEffect, useState } from "react";

const useCountdown = (expiredAt: string | null) => {
  const [timeLeft, setTimeLeft] = useState<{
    minutes: number;
    seconds: number;
  }>({
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    if (!expiredAt) return;

    const target = new Date(expiredAt).getTime();

    const interval = setInterval(() => {
      const diff = target - Date.now();

      if (diff <= 0) {
        clearInterval(interval);
        setTimeLeft({
          minutes: 0,
          seconds: 0,
        });
      } else {
        const totalSeconds = Math.floor(diff / 1000);
        setTimeLeft({
          minutes: Math.floor(totalSeconds / 60),
          seconds: totalSeconds % 60,
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [expiredAt]);

  return timeLeft;
};

export default useCountdown;
