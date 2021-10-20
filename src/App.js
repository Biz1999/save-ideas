import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Landing from "./pages/Landing";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Switch>
            {/* <Route path="/users">
            <Users />
          </Route> */}
            <Route exact path="/">
              <Landing />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
