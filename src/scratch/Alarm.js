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
  // const [state, send] = useService(alarmRef);
  // const {
  //   value: status,
  //   context: { count }
  // } = state;

  const time = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit"
  });
  const handleToggle = () => send({ type: "TOGGLE" });

  useEffect(() => {
    const timeout =
      state.value === "pending"
        ? setTimeout(() => send({ type: "SUCCESS" }), 3000)
        : null;
    return () => clearTimeout(timeout);
  }, [state.value, send]);

  return (
    <div className="alarm">
      <div className="alarmTime">{time}</div>
      <div
        className="alarmToggle"
        data-active={state.value === "active" || undefined}
        onClick={handleToggle}
        style={{ opacity: state.value === "pending" ? 0.5 : 1 }}
      />
    </div>
  );
}
