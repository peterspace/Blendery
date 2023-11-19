import React, { useEffect, useState } from 'react';

// 2hrs = 2 * 60 * 60 * 1000 ===> to milisecons
//defaultTime={2*60*60*100}

export const TimerFormat = ({ duration }) => {
  const timeLeft =
    new Date(duration).getTime() - new Date(Date.now()).getTime(); // already in milli seconds time difference
  const [time, setTime] = useState(timeLeft);

  useEffect(() => {
    setTimeout(() => {
      setTime(time - 1000); // reduce time by 1000 mili seconds which is 1 second after every 1 sec(from timer)
    }, 1000);
  }, [time]);

  const getFormattedTime = (milliseconds) => {
    let totalSeconds = parseInt(Math.floor(milliseconds / 1000));
    let totalMinutes = parseInt(Math.floor(totalSeconds / 60));
    let totalHours = parseInt(Math.floor(totalMinutes / 60));
    let days = parseInt(Math.floor(totalHours / 24));

    let seconds = parseInt(totalSeconds % 60); // modulus operation (loops from 60 to 0 and back from 60 again)
    let minutes = parseInt(totalMinutes % 60); // modulus operation (loops from 60 to 0 and back from 60 again)
    let hours = parseInt(totalHours % 24); // modulus operation (loops from 60 to 0 and back from 60 again)

    // return { seconds, minutes, hours };
    // return `${days}: ${hours}: ${minutes}:${seconds}`;

    if (timeLeft <= 0) {
      return `${`00`}: ${`00`}:${`00`}`;
    }
    return `${hours}: ${minutes}:${seconds}`;
  };

  return <div>{getFormattedTime(time)}</div>;
};

{
  /* <TimerFormat duration={2 * 60 * 60 * 100} />; */
}
