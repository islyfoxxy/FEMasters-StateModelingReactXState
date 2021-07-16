import { useMachine } from "@xstate/react";
import { Tabs, Tab, TabList, TabPanels, TabPanel } from "@reach/tabs";

import Clock from "./Clock";
import NewTimer from "./NewTimer";
import Timer from "./Timer";
import timerAppMachine from "./timerAppMachine";
import { useEffect } from "react";

export default function AppFinal() {
  const [state, send] = useMachine(timerAppMachine);
  const { currentTimer, timers } = state.context;

  const onAdd = () => send({ type: "CREATE" });
  const onDelete = () => send({ type: "DELETE" });

  const timersComponents = timers.map((timer, index) => (
    <Timer
      key={timer.id}
      timerActorRef={timer}
      onDelete={onDelete}
      onAdd={onAdd}
      data-active={index === currentTimer || undefined}
    />
  ));

  const handleAddTimer = (duration) => send({ type: "ADD", payload: duration });
  const handleCancelTimer = () => timers.length > 0 && send({ type: "CANCEL" });
  const handleSwitch = ({ target }) => {
    console.log("SWITCH to index", target.dataset.index);
    send({ type: "SWITCH", payload: target.dataset.index });
  };

  useEffect(() => {
    console.log("STATE", state.toStrings().join(" "));
  }, [state]);

  return (
    <Tabs
      as="main"
      className="app"
      data-state={state.toStrings().join(" ")}
      defaultIndex={1}
    >
      <TabList className="app-tabs">
        <Tab className="app-tab">Clock</Tab>
        <Tab className="app-tab">Timer</Tab>
      </TabList>

      <TabPanels className="app-panels">
        <TabPanel className="app-panel">
          <Clock />
        </TabPanel>

        <TabPanel className="app-panel">
          <NewTimer
            onSubmit={handleAddTimer}
            onCancel={timers.length > 0 ? handleCancelTimer : null}
            key={state.toStrings().join(" ")}
          />

          <div
            className="timers"
            style={{ width: "60%", marginLeft: "20%" }}
            hidden={!state.matches("timer")}
          >
            {timersComponents}
          </div>

          <div className="dots" hidden={!state.matches("timer")}>
            {state.context.timers.map((_, index) => {
              return (
                <div
                  className="dot"
                  data-active={index === currentTimer || undefined}
                  key={index}
                  data-index={index}
                  onClick={handleSwitch}
                ></div>
              );
            })}
          </div>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
