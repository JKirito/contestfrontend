import "./App.css"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Home from "./components/Home"
import DataView from "./components/DataView"

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Home}></Route>
          <Route path="/dataview" exact component={DataView}></Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
