import { assign, createMachine } from "xstate";

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
        invoke: {
          src: ({ interval }) => (sendBack) => {
            const tickInterval = setInterval(() => {
              console.log("SEND TICK");
              sendBack("TICK");
            }, 1000 * interval);

            return () => {
              console.log("CLEAN UP TICK");
              clearInterval(tickInterval);
            };
          }
        },
        on: {
          TOGGLE: "paused",
          ADD_MINUTE: { actions: "addMinute" },
          TICK: { actions: "tick" },
          RESET: "idle"
        },
        onDone: "idle",
        initial: "normal",
        states: {
          normal: {
            always: { target: "overtime", cond: "isTimerDone" },
            on: { RESET: undefined }
          },
          overtime: {
            after: {
              5000: "timeOver"
            },
            on: { TOGGLE: undefined }
          },
          timeOver: {
            type: "final"
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
