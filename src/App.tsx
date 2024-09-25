import { useState } from "react";
import "./styles.css";

// Simulate a task
async function doTask(): Promise<void> {
  return new Promise((resolve, reject) => {
    const isSuccess = Math.random() > 0.5;
    setTimeout(() => {
      if (isSuccess) {
        resolve();
      } else {
        reject();
      }
    }, 100); // Simulate some delay for the task
  });
}

export default function App() {
  const [successCount, setSuccessCount] = useState(0);
  const [failureCount, setFailureCount] = useState(0);
  const [incrementValue, setIncrementValue] = useState(1);

  // Simulate multiple async tasks with possible failures
  const incrementMultipleTimes = () => {
    for (let i = 0; i < incrementValue; i++) {
      doTask()
        .then(() => {
          setSuccessCount(successCount + 1);
        })
        .catch(() => {
          setFailureCount(failureCount + 1);
        });
    }
  };

  const reset = () => {
    setSuccessCount(0);
    setFailureCount(0);
    setIncrementValue(1);
  };

  return (
    <div className="App">
      <h1>Task Counter</h1>
      <h2>Success: {successCount}</h2>
      <h2>Failure: {failureCount}</h2>
      <h2>Total: {successCount + failureCount}</h2>

      <input
        type="number"
        value={incrementValue}
        onChange={(e) => setIncrementValue(Number(e.target.value))}
      />
      <button onClick={incrementMultipleTimes}>Start Tasks</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
