import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ScratchApp from "./scratch/ScratchApp";
import Timer00 from "./00/Timer00";
import Timer01 from "./01/Timer01";
import "./index.scss";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <ScratchApp />
        </Route>
        <Route exact path="/00">
          <Timer00 />
        </Route>
        <Route exact path="/01">
          <Timer01 />
        </Route>
      </Switch>
    </Router>
  );
}
