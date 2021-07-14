import { useEffect } from "react";
import { useMachine } from "@xstate/react";
import timerMachine from "./timerMachine";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { inspect } from "@xstate/inspect";
import ProgressCircle from "../ProgressCircle";

// inspect({ iframe: false });

export default function Timer01() {
  const [state, send] = useMachine(timerMachine, { devTools: true });
  const { duration, elapsed, interval } = state.context;

  const handleReset = () => send({ type: "RESET" });
  const handleAction = () => send({ type: "TOGGLE" });

  useEffect(() => {
    // setInterval(() => {}, 1000);
  }, [state]);

  return (
    <div
      className="timer"
      data-state={state.value}
      style={{
        // @ts-ignore
        "--duration": duration,
        "--elapsed": elapsed,
        "--interval": interval
      }}
    >
      <header>Exercise 01</header>
      <ProgressCircle />
      <div className="display">
        <div className="label">{state.value}</div>
        <div className="elapsed" onClick={handleAction}>
          {Math.ceil(duration - elapsed)}
        </div>
        <div className="controls">
          <button onClick={handleReset}>Reset</button>
        </div>
      </div>
      <div className="actions">
        <button onClick={handleAction} title="Timer Action">
          <FontAwesomeIcon
            icon={state.value === "running" ? faPause : faPlay}
          />
        </button>
      </div>
    </div>
  );
}
