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
          TOGGLE: [
            {
              target: "pending",
              cond: "canCount",
              actions: "incrementCount"
            },
            { target: "disabled" }
          ]
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
      },
      disabled: {}
    }
  },
  {
    actions: {
      incrementCount: assign({ count: ({ count }) => count + 1 })
    },
    guards: {
      canCount: ({ count }) => count < 5
    }
  }
);

export default alarmMachine;
