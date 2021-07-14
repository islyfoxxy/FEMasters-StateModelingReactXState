import { useEffect, useRef } from "react";
import { useMachine } from "@xstate/react";
import timerMachine from "./timerMachine";
import { faPlay, faPause, faStop } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { inspect } from "@xstate/inspect";
import ProgressCircle from "../ProgressCircle";

inspect({ iframe: false });

export default function Timer06() {
  const [state, send] = useMachine(timerMachine, { devTools: true });
  const { duration, elapsed, interval } = state.context;
  const countdownInterval = useRef(null);
  const actionIcon = state.matches("running.overtime")
    ? faStop
    : state.matches("running.normal")
    ? faPause
    : faPlay;

  const handleReset = () => send({ type: "RESET" });
  const handleAction = () => send({ type: "TOGGLE" });
  const handleAddMinute = () => send({ type: "ADD_MINUTE" });

  useEffect(() => {
    if (state.matches("running")) {
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
  }, [state, send, interval]);

  return (
    <div
      className="timer"
      data-state={state.toStrings().join(" ")}
      style={{
        // @ts-ignore
        "--duration": duration,
        "--elapsed": elapsed,
        "--interval": interval
      }}
    >
      <header>Exercise 06</header>
      <ProgressCircle />
      <div className="display">
        <div className="label">{state.toStrings().pop()}</div>
        <div className="elapsed" onClick={handleAction}>
          {Math.ceil(duration - elapsed)}
        </div>
        <div className="controls">
          {["paused", "running.overtime"].some(state.matches) && (
            <button onClick={handleReset}>Reset</button>
          )}
          {state.matches("running.normal") && (
            <button onClick={handleAddMinute}>+1.00</button>
          )}
        </div>
      </div>
      <div className="actions">
        <button
          onClick={
            state.matches("running.overtime") ? handleReset : handleAction
          }
          title="Timer Action"
        >
          <FontAwesomeIcon icon={actionIcon} />
        </button>
      </div>
    </div>
  );
}
