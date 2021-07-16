// import { createMachine, assign, spawn, sendParent } from "xstate";
// import { useService } from "@xstate/react";
// import { useEffect } from "react";
import { useMachine } from "@xstate/react";
import { useActor } from "@xstate/react";
// import alarmMachine from "./alarmMachine";
import greetingMachine from "./greetingMachine";

// const alarmReducer = (state, event) => {
//   return alarmMachine.states[state]?.on[event.type] || state;
// };

export default function Alarm({ alarmActorRef }) {
  // const [status, dispatch] = useReducer(alarmReducer, "pending");
  const [state, send] = useActor(alarmActorRef);
  const [greetState] = useMachine(greetingMachine);
  const { count } = state.context;

  const time = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit"
  });
  const handleToggle = () => send({ type: "TOGGLE" });

  // useEffect(() => {
  //   const timeout =
  //     status === "pending"
  //       ? setTimeout(() => send({ type: "SUCCESS" }), 3000)
  //       : null;
  //   return () => clearTimeout(timeout);
  // }, [status, send]);

  return (
    <div className="alarm">
      <div className="alarmTime">
        {time}({count}) {state.toStrings().join(" ")}
      </div>
      <div
        className="alarmToggle"
        data-active={state.matches("active") || undefined}
        onClick={handleToggle}
        style={{ opacity: state.matches("pending") ? 0.5 : 1 }}
      />
      <h2>Good {greetState.value}!</h2>
    </div>
  );
}
