// import { createMachine, assign, spawn, sendParent } from "xstate";
// import { useService } from "@xstate/react";
import { useEffect, useReducer } from "react";
import alarmMachine from "./alarmMachine";

const initState = "pending";
const alarmReducer = (state, event) => {
  return alarmMachine.states[state]?.on[event.type] || state;
};

export default function Alarm({ alarmRef }) {
  // const [state, send] = useService(alarmRef);
  // const {
  //   value: status,
  //   context: { count }
  // } = state;
  //active inactive pending
  const [status, dispatch] = useReducer(alarmReducer, initState);

  const time = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit"
  });
  const handleToggle = () => dispatch({ type: "TOGGLE" });

  useEffect(() => {
    const timeout =
      status === "pending"
        ? setTimeout(() => dispatch({ type: "SUCCESS" }), 2000)
        : null;

    return () => clearTimeout(timeout);
  }, [status]);

  return (
    <div className="alarm">
      <div className="alarmTime">{time}</div>
      <div
        className="alarmToggle"
        data-active={status === "active" || undefined}
        onClick={handleToggle}
        style={{ opacity: status === "pending" ? 0.5 : 1 }}
      ></div>
    </div>
  );
}
