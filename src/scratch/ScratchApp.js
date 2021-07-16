import { useMachine } from "@xstate/react";
import alarmsMachine from "./alarmsMachine";
import Alarm from "./Alarm";

export default function ScratchApp() {
  const [state, send] = useMachine(alarmsMachine);
  const { alarms } = state.context;

  const handleClick = () => send("ADD_ALARM");

  const alarmsComponents = alarms.map((alarm, index) => (
    <Alarm key={index} alarmActorRef={alarm} />
  ));

  return (
    <div className="scratch">
      <button onClick={handleClick}>Add Alarm</button>
      {alarmsComponents}
    </div>
  );
}
