import React, { useState, useEffect } from "react";

function CountdownTimer({ hackathonDate }) {
  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const targetDate = new Date(hackathonDate).getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [hackathonDate]);

  return (
    <div className="flex justify-between items-center bg-red-300 p-3 rounded-xl  ">
      {timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.minutes === 0 ?
        <h3 className="text-center text-lg font-semibold m-auto">Applications Closed</h3>
        :
        <>
        <div className=" px-5 flex justify-between gap-2 items-center">
          <h3 className="font-semibold ">Applications Close In </h3>
          
          <p className="font-semibold">
            {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
          </p>
          </div>
        </>
      }
    </div>
  );
}

export default CountdownTimer;