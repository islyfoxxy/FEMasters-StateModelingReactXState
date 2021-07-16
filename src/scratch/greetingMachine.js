import { createMachine } from "xstate";

const greetingMachine = createMachine(
  {
    initial: "unknown",
    states: {
      unknown: {
        always: [
          { target: "morning", cond: "isMorning" },
          { target: "afternoon", cond: "isAfternoon" },
          { target: "evening" }
        ]
      },
      morning: {},
      afternoon: {},
      evening: {}
    }
  },
  {
    guards: {
      isMorning: () => new Date().getHours() < 11,
      isAfternoon: () => new Date().getHours() < 17
    }
  }
);

export default greetingMachine;
