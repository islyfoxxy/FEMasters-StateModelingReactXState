import { assign, createMachine, send } from "xstate";

const initState = {
  duration: 5,
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
          TICK: [
            { target: "expired", cond: "isTimerDone" },
            { actions: "tick" }
          ]
        }
      },
      paused: {
        on: {
          TOGGLE: "running",
          RESET: "idle"
        }
      },
      expired: {
        on: {
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
        elapsed: ({ elapsed, interval }) =>
          Math.round((elapsed + interval) * 100) / 100
      }),
      reset: assign({
        duration: initState.duration,
        elapsed: initState.elapsed
      })
    },
    guards: {
      isTimerDone: ({ duration, elapsed }) => elapsed >= duration
    }
  }
);

export default timerMachine;
