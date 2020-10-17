import React from "react"
import { render } from "react-dom"
import { HashRouter as Router, Switch, Route, Redirect } from "react-router-dom"

import Prose from "./pages/prose"
import FaceFilter from "./pages/faceFilter"
import TextRoutes from "./pages/text"

function App({ scene = 4 }) {
  return (
    <>
      {scene === 4 && <FaceFilter />}
      {scene === 5 && <Prose />}
    </>
  )
}

function Body() {
  return (
    <Router>
      <main>
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Redirect to="/prose" />
            </Route>
            <Route exact path="/facefilter">
              <App scene={4} />
            </Route>
            <Route exact path="/prose">
              <App scene={5} />
            </Route>
            <Route path="/text" component={TextRoutes} />
          </Switch>
        </div>
      </main>
    </Router>
  )
}

render(<Body />, document.querySelector("#root"))
