import { assign, createMachine } from "xstate";

const clockMachine = createMachine(
  {
    initial: "active",
    context: {
      time: new Date()
    },
    states: {
      active: {
        invoke: {
          src: () => (sendBack) => {
            const tickInterval = setInterval(() => {
              sendBack({ type: "TICK", payload: new Date() });
            }, 1000);

            return () => {
              console.log("CLEAN UP TICK");
              clearInterval(tickInterval);
            };
          }
        },
        on: {
          TICK: { actions: "tick" }
        }
      }
    }
  },
  {
    actions: {
      tick: assign({ time: (_, { payload }) => payload })
    }
  }
);

export default clockMachine;
