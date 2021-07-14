import { useEffect, useRef } from "react";
import { useMachine } from "@xstate/react";
import timerMachine from "./timerMachine";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { inspect } from "@xstate/inspect";
import ProgressCircle from "../ProgressCircle";

inspect({ iframe: false });

export default function Timer05() {
  const [state, send] = useMachine(timerMachine, { devTools: true });
  const {
    context: { duration, elapsed, interval },
    value: status
  } = state;
  const countdownInterval = useRef(null);
  const handleReset = () => send({ type: "RESET" });
  const handleAction = () => send({ type: "TOGGLE" });
  const handleAddMinute = () => send({ type: "ADD_MINUTE" });

  useEffect(() => {
    if (status === "running") {
      clearInterval(countdownInterval.current);
      countdownInterval.current = setInterval(() => {
        send("TICK");
      }, 1000 * interval);
    } else {
      clearInterval(countdownInterval.current);
    }

    return () => {
      clearInterval(countdownInterval.current);
    };
  }, [status, send, interval]);

  return (
    <div
      className="timer"
      data-state={status}
      style={{
        // @ts-ignore
        "--duration": duration,
        "--elapsed": elapsed,
        "--interval": interval
      }}
    >
      <header>Exercise 05</header>
      <ProgressCircle />
      <div className="display">
        <div className="label">{status}</div>
        <div className="elapsed" onClick={handleAction}>
          {Math.ceil(duration - elapsed)}
        </div>
        <div className="controls">
          {["paused", "expired"].some(state.matches) && (
            <button onClick={handleReset}>Reset</button>
          )}
          {state.matches("running") && (
            <button onClick={handleAddMinute}>+1.00</button>
          )}
        </div>
      </div>
      <div className="actions">
        <button onClick={handleAction} title="Timer Action">
          <FontAwesomeIcon icon={status === "running" ? faPause : faPlay} />
        </button>
      </div>
    </div>
  );
}
