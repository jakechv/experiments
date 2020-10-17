import React from "react"
import { render } from "react-dom"
import { HashRouter as Router, Switch, Route, Redirect } from "react-router-dom"

import Prose from "./pages/prose"
import FaceFilter from "./pages/faceFilter"
import TextRoutes from "./pages/text"
import Form from "./pages/Form.bs"

const Body = () => (
  <Router>
    <main>
      <div className="content">
        <Switch>
          <Route exact path="/">
            <Redirect to="/prose" />
          </Route>
          <Route exact path="/facefilter">
            <FaceFilter />
          </Route>
          <Route exact path="/prose">
            <Prose />
          </Route>
          <Route exact path="/prose">
            <Prose />
          </Route>
          <Route exact path="/form">
            <Form />
          </Route>
          <Route path="/text" component={TextRoutes} />
        </Switch>
      </div>
    </main>
  </Router>
)

render(<Body />, document.querySelector("#root"))
