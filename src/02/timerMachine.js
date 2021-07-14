import { assign, createMachine } from "xstate";

const initState = {
  duration: 60,
  elapsed: 0,
  interval: 0.1
};

const timerMachine = createMachine({
  initial: "idle",
  context: {
    duration: initState.duration,
    elapsed: initState.elapsed,
    interval: initState.interval,
    countdownInterval: null
  },
  states: {
    idle: {
      entry: assign({
        duration: initState.duration,
        elapsed: initState.elapsed
      }),
      on: {
        TOGGLE: "running"
      }
    },
    running: {
      on: {
        TOGGLE: "paused",
        ADD_MINUTE: {
          actions: assign({ duration: ({ duration }) => duration + 60 })
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
});

export default timerMachine;
