import { assign, createMachine, send } from "xstate";

const initState = {
  duration: 60,
  elapsed: 0,
  interval: 0.1
};

const timerMachine = createMachine(
  {
    initial: "idle",
    context: {
      duration: initState.duration,
      elapsed: initState.elapsed,
      interval: initState.interval
    },
    states: {
      idle: {
        entry: "reset",
        on: {
          TOGGLE: "running"
        }
      },
      running: {
        on: {
          TOGGLE: "paused",
          ADD_MINUTE: {
            actions: "addMinute"
          },
          TICK: {
            actions: "tick"
          }
        }
      },
      paused: {
        on: {
          TOGGLE: "running",
          RESET: "idle"
        }
      }
    }
  },
  {
    actions: {
      addMinute: assign({
        duration: ({ duration }) => duration + 60
      }),
      tick: assign({
        elapsed: ({ elapsed, interval }) => elapsed + interval
      }),
      reset: assign({
        duration: initState.duration,
        elapsed: initState.elapsed
      })
    }
  }
);

export default timerMachine;
