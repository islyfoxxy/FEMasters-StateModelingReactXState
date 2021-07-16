import { useMachine } from "@xstate/react";
import greetingMachine from "./greetingMachine";
import clockMachine from "./clockMachine";

export default function Clock() {
  const [state] = useMachine(clockMachine);
  const [greetState] = useMachine(greetingMachine);
  const { time } = state.context;

  return (
    <div className="clock">
      <div className="local">
        <h1 className="localTime">{time.toLocaleTimeString("en-US")}</h1>
        <strong className="localDate">{time.toLocaleDateString()}</strong>
      </div>
      {/* <div className="foreign">Foreign Clock</div> */}
      <h2>Good {greetState.value}!</h2>
    </div>
  );
}
