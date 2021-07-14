const timerMachine = {
  initial: "idle",
  context: {
    duration: 60,
    elapsed: 0,
    interval: 0.1
  },
  states: {
    idle: {
      on: {
        TOGGLE: "running"
      }
    },
    running: {
      on: {
        TOGGLE: "paused"
      }
    },
    paused: {
      on: {
        TOGGLE: "running",
        RESET: "idle"
      }
    }
  }
};

export default timerMachine;
