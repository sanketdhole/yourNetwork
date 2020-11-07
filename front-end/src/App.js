import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Home from "./Components/Pages/Home";
import CreateUser from "./Components/Pages/CreateUser";
import DefineRelation from "./Components/Pages/DefineRelation";
import FindRelation from "./Components/Pages/FindRelation";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Home}></Route>
          <Route path="/create-user" exact component={CreateUser}></Route>
          <Route
            path="/define-relation"
            exact
            component={DefineRelation}
          ></Route>
          <Route path="/find-relation" exact component={FindRelation}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
