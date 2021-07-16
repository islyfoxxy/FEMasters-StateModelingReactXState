import { assign, createMachine, spawn } from "xstate";
import createTimerMachine from "./timerMachine";

const timerAppMachine = createMachine(
  {
    initial: "new",
    context: {
      timers: [],
      currentTimer: -1
    },
    states: {
      new: {
        on: {
          CANCEL: { target: "timer", cond: "isTimerAvailable" }
        }
      },
      timer: {
        on: {
          DELETE: [
            {
              actions: "deleteCurrentTimer",
              cond: "isOneTimerAvailableOnly",
              target: "new"
            },
            { actions: "deleteCurrentTimer" }
          ]
        }
      }
    },
    on: {
      ADD: { target: "timer", actions: "addNewTimer" },
      CREATE: "new",
      SWITCH: { actions: "switchCurrentTimer" }
    }
  },
  {
    actions: {
      addNewTimer: assign({
        timers: ({ timers }, { payload }) => {
          const newTimer = spawn(createTimerMachine(payload));
          return [...timers, newTimer];
        },
        currentTimer: ({ timers }) => timers.length
      }),
      switchCurrentTimer: assign({
        currentTimer: (_, { payload }) => parseInt(payload, 10)
      }),
      deleteCurrentTimer: assign({
        timers: ({ timers, currentTimer }) =>
          timers.filter((_, index) => index !== currentTimer),
        currentTimer: ({ currentTimer, timers }) =>
          timers.length === 1 ? -1 : Math.max(0, currentTimer - 1)
      })
    },
    guards: {
      isTimerAvailable: ({ timers }) => timers.length > 0,
      isOneTimerAvailableOnly: ({ timers }) => timers.length === 1
    }
  }
);
export default timerAppMachine;
