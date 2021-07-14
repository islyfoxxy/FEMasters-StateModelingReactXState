import { createMachine, assign } from "xstate";

const alarmMachine = createMachine(
  {
    initial: "inactive",
    context: {
      count: 0
    },
    states: {
      inactive: {
        on: {
          TOGGLE: {
            target: "pending",
            actions: "incrementCount"
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
  },
  {
    actions: {
      incrementCount: assign({ count: ({ count }) => count + 1 })
    }
  }
);

export default alarmMachine;
