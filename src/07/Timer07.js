import { useMachine } from "@xstate/react";
import { faPlay, faPause, faStop } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { inspect } from "@xstate/inspect";
import ProgressCircle from "../ProgressCircle";
import timerMachine from "./timerMachine";

inspect({ iframe: false });

export default function Timer07() {
  const [state, send] = useMachine(timerMachine, { devTools: true });
  const { duration, elapsed, interval } = state.context;
  const actionIcon = state.matches("running.overtime")
    ? faStop
    : state.matches("running.normal")
    ? faPause
    : faPlay;

  const handleReset = () => send({ type: "RESET" });
  const handleAction = () => send({ type: "TOGGLE" });
  const handleAddMinute = () => send({ type: "ADD_MINUTE" });

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
      <header>Exercise 07</header>
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
