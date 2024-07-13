import Layout from '../../components/Layout';
import { useEffect, useState } from 'react';

const msToHour = (ms) => {
  const hours = Math.floor(ms / 3600000);
  const minutes = Math.floor((ms % 3600000) / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${hours} hour, ${minutes} minutes, ${seconds} seconds`;
};

const targetTime = Date.now() + 1000 * 60 * 60 * 24;

export default function Countdown({ title }) {
  const [currentTime, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime((prev) => prev + 1000);
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <Layout pageTitle={title}>
      <div>What is it counting down to?</div>
      <div className="mx-auto max-w-screen-md px-4">
        Remaining: {msToHour(targetTime - currentTime)}
      </div>
    </Layout>
  );
}
