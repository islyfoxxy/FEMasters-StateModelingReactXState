import { assign, createMachine, spawn } from "xstate";
import alarmMachine from "./alarmMachine";

const alarmsMachine = createMachine({
  initial: "active",
  context: {
    alarms: []
  },
  states: {
    active: {
      on: {
        ADD_ALARM: {
          actions: assign({
            alarms: ({ alarms }) => {
              const newAlarm = spawn(alarmMachine);
              return [...alarms, newAlarm];
            }
          })
        },
        ACTIVE: {
          actions: (_, event) => {
            console.log("EVENT received: ", event);
          }
        }
      }
    }
  }
});

export default alarmsMachine;
