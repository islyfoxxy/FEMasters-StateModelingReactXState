import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ScratchApp from "./scratch/ScratchApp";
import Timer00 from "./00/Timer00";
import Timer01 from "./01/Timer01";
import Timer02 from "./02/Timer02";
import Timer03 from "./03/Timer03";
import Timer04 from "./04/Timer04";
import Timer05 from "./05/Timer05";
import Timer06 from "./06/Timer06";
import Timer07 from "./07/Timer07";
import "./index.scss";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={ScratchApp}></Route>
        <Route exact path="/00" component={Timer00}></Route>
        <Route exact path="/01" component={Timer01}></Route>
        <Route exact path="/02" component={Timer02}></Route>
        <Route exact path="/03" component={Timer03}></Route>
        <Route exact path="/04" component={Timer04}></Route>
        <Route exact path="/05" component={Timer05}></Route>
        <Route exact path="/06" component={Timer06}></Route>
        <Route exact path="/07" component={Timer07}></Route>
      </Switch>
    </Router>
  );
}
