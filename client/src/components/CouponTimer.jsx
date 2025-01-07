import { useState, useEffect } from "react";
import { Card } from "./ui/card";

const TimerCard = ({ value, label }) => (
  <Card className="flex flex-col items-center justify-center w-[4rem] h-[4rem] relative">
    <p className="absolute top-2 font-medium text-2xl">{value}</p>
    <span className="absolute bottom-0 p-[0.15rem] text-xs font-medium text-center text-white dark:text-black bg-black dark:bg-gray-200 w-full rounded-b-md">
      {label}
    </span>
  </Card>
);

const CouponTimer = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = new Date(targetDate).getTime() - new Date().getTime();
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer); // Cleanup timer on component unmount
  }, [targetDate]); // Re-run effect if targetDate changes


  return (
    <div className="flex items-center gap-4 text-lg font-semibold">
        <div className="flex items-center justify-between gap-4" >
          <TimerCard value={timeLeft.days} label="Days" />
          <TimerCard value={timeLeft.hours} label="Hours" />
          <TimerCard value={timeLeft.minutes} label="Minutes" />
          <TimerCard value={timeLeft.seconds} label="Seconds" />
        </div>
    </div>
  );
};
export default CouponTimer;