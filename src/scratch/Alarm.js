// import { createMachine, assign, spawn, sendParent } from "xstate";
// import { useService } from "@xstate/react";
import { useEffect } from "react";
import { useMachine } from "@xstate/react";
import alarmMachine from "./alarmMachine";

// const initState = "pending";
// const alarmReducer = (state, event) => {
//   return alarmMachine.states[state]?.on[event.type] || state;
// };

export default function Alarm({ alarmRef }) {
  // const [status, dispatch] = useReducer(alarmReducer, initState);
  const [state, send] = useMachine(alarmMachine);
  const {
    value: status,
    context: { count }
  } = state;

  const time = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit"
  });
  const handleToggle = () => send({ type: "TOGGLE" });

  useEffect(() => {
    const timeout =
      status === "pending"
        ? setTimeout(() => send({ type: "SUCCESS" }), 3000)
        : null;
    return () => clearTimeout(timeout);
  }, [status, send]);

  return (
    <div className="alarm">
      <div className="alarmTime">
        {time}({count}) {state.toStrings().join(" ")}
      </div>
      <div
        className="alarmToggle"
        data-active={status === "active" || undefined}
        onClick={handleToggle}
        style={{ opacity: status === "pending" ? 0.5 : 1 }}
      />
    </div>
  );
}
