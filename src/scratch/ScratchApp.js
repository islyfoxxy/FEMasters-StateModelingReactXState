import { send } from "xstate";
import Alarm from "./Alarm";

export default function ScratchApp() {
  const handleClick = () => send("ADD_ALARM");

  return (
    <div className="scratch">
      <button onClick={handleClick}>Add Alarm</button>
      <Alarm />
    </div>
  );
}
