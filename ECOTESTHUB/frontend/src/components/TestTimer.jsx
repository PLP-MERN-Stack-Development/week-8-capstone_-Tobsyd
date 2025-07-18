import React, { useEffect, useState } from 'react';
export default function TestTimer({ duration, onTimeUp }) {
  const [time, setTime] = useState(duration * 60);
  useEffect(() => {
    if (time <= 0) return onTimeUp();
    const interval = setInterval(() => setTime(t => t - 1), 1000);
    return () => clearInterval(interval);
  }, [time]);
  const mins = Math.floor(time / 60);
  const secs = time % 60;
  return <div>{mins}:{secs < 10 ? `0${secs}` : secs}</div>;
}