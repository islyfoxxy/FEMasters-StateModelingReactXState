import { assign, createMachine } from "xstate";

const createTimerMachine = (duration) =>
  createMachine(
    {
      initial: "running",
      context: {
        duration: duration,
        elapsed: 0,
        interval: 0.1
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
              const tickInterval = setInterval(
                () => sendBack("TICK"),
                1000 * interval
              );

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
          duration: duration,
          elapsed: 0
        })
      },
      guards: {
        isTimerDone: ({ duration, elapsed }) => elapsed >= duration
      }
    }
  );

export default createTimerMachine;
