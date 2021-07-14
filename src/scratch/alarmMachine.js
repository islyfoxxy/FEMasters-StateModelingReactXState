import { createMachine, assign } from "xstate";

const alarmMachine = createMachine({
  initial: "inactive",
  context: {
    count: 0
  },
  states: {
    inactive: {
      on: {
        TOGGLE: {
          target: "pending",
          actions: assign({
            count: ({ count }) => count + 1
          })
        }
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
