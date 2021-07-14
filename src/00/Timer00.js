import { useEffect, useReducer } from "react";
import timerMachine from "./timerMachine";
import ProgressCircle from "../ProgressCircle";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const reducer = (state, event) => {
  return timerMachine.states[state]?.on[event.type] || state;
};

export default function Timer00() {
  const [state, dispatch] = useReducer(reducer, "idle");

  const { duration, elapsed, interval } = timerMachine.context;

  const handleReset = () => dispatch({ type: "RESET" });
  const handleAction = () => dispatch({ type: "TOGGLE" });

  useEffect(() => {
    // setInterval(() => {}, 1000);
  }, [state]);

  return (
    <div
      className="timer"
      data-state={state}
      style={{
        // @ts-ignore
        "--duration": duration,
        "--elapsed": elapsed,
        "--interval": interval
      }}
    >
      <header>Exercise 00</header>
      <ProgressCircle />
      <div className="display">
        <div className="label">{state}</div>
        <div className="elapsed" onClick={handleAction}>
          {Math.ceil(duration - elapsed)}
        </div>
        <div className="controls">
          <button onClick={handleReset}>Reset</button>
        </div>
      </div>
      <div className="actions">
        <button onClick={handleAction} title="Timer Action">
          <FontAwesomeIcon icon={state === "running" ? faPause : faPlay} />
        </button>
      </div>
    </div>
  );
}
