import { createMachine } from "xstate";

const alarmMachine = createMachine({
  initial: "inactive",
  states: {
    inactive: {
      on: {
        TOGGLE: "pending"
      }
    },
    pending: {
      on: {
        SUCCESS: "active",
        TOGGLE: "inactive"
      }
    },
    active: {
      on: {
        TOGGLE: "inactive"
      }
    }
  }
});

export default alarmMachine;
