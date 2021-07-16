import { createMachine, assign, send, sendParent } from "xstate";

// const saveAlarm = () => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => resolve(100), 3000);
//   });
// };

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
            { target: "rejected" }
          ]
        }
      },
      pending: {
        invoke: {
          id: "timeout",
          // src: () => saveAlarm(),
          src: () => (sendBack, receive) => {
            receive((event) => {
              console.log("EVENT", event);
            });

            const timer = setTimeout(() => {
              sendBack({ type: "SUCCESS" });
            }, 3000);

            // clean up when transition to another state
            return () => {
              console.log("CLEAN UP!");
              clearTimeout(timer);
            };
          }
          // onDone: [
          //   { target: "active", cond: (_, { data }) => data > 99 },
          //   { target: "rejected" }
          // ],
          // onError: "rejected"
        },
        on: {
          SUCCESS: "active",
          TOGGLE: {
            target: "inactive"
            // actions: send({ type: "GOODBYE" }, { to: "timeout" })
          }
        }
      },
      active: {
        entry: sendParent("ACTIVE"),
        on: {
          TOGGLE: "inactive"
        }
      },
      rejected: {}
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
