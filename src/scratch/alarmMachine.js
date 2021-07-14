const alarmMachine = {
  initial: "inactive",
  states: {
    inactive: {
      on: {
        TOGGLE: "pending"
      }
    },
    pending: {
      on: {
        SUCCESS: "active",
        TOGGLE: "pending"
      }
    },
    active: {
      on: {
        TOGGLE: "inactive"
      }
    }
  }
};

export default alarmMachine;
