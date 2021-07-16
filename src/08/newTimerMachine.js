import { assign, createMachine } from "xstate";

const newTimerMachine = createMachine(
  {
    initial: "active",
    context: {
      duration: 0
    },
    states: {
      active: {
        on: {
          change: {
            actions: "assignDuration"
          },
          submit: {
            actions: "submit",
            cond: "isDurationValid"
          }
        }
      }
    }
  },
  {
    actions: {
      assignDuration: assign({
        duration: (_, { target }) => parseInt(target.value, 10)
      }),
      submit: () => {
        console.log("RESET SUBMIT");
      }
    },
    guards: {
      isDurationValid: ({ duration }) => !isNaN(duration) && duration > 0
    }
  }
);

export default newTimerMachine;
