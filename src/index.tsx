import { render } from "react-dom"
import React, { Suspense } from "react"
import { Canvas } from "react-three-fiber"
import { useProgress, Html } from "@react-three/drei"
import Prose from "./pages/prose"

/* eslint-disable @typescript-eslint/no-unused-vars */
import FaceFilter from "./pages/faceFilter"

import { AppContainer } from "react-hot-loader"
import {
  HashRouter as Router,
  Switch,
  Route,
  NavLink,
  Redirect,
} from "react-router-dom"

import Scene1 from "./pages/Scene1"
import Scene2 from "./pages/Scene2"
import Scene3 from "./pages/Scene3"

import "./base.css"

function Loader() {
  const { progress } = useProgress()

  return (
    <Html center>
      <span style={{ color: "#FFFFFF" }}>{progress} % loaded</span>
    </Html>
  )
}

function App({ scene = 1 }) {
  const a = Number("#000")

  return (
    <Canvas concurrent shadowMap camera={{ position: [0, 0, 5], fov: 70 }}>
      <color attach="background" args={[a, a, a]} />
      <Suspense fallback={<Loader />}>
        {scene === 1 && <Scene1 />}
        {scene === 2 && <Scene2 />}
        {scene === 3 && <Scene3 />}
        {scene === 4 && (
          <AppContainer>
            <FaceFilter />
          </AppContainer>
        )}
        {scene === 5 && <Prose />}
      </Suspense>
      <ambientLight intensity={0.4} />
    </Canvas>
  )
}

/* eslint-disable @typescript-eslint/no-unused-vars */
function Body() {
  return (
    <Router>
      <main>
        <div className="frame">
          <div className="frame__title-wrap">
            <h1 className="frame__title">Experiments | Jacob Chvatal</h1>
            <p className="frame__tagline">Interactive web experiments</p>
          </div>
          <div className="frame__links">
            <a href="https://tympanus.net/Development/MenuFullGrid/">
              Previous demo
            </a>
            <a href="https://tympanus.net/codrops/?p=51167">Article</a>
            <a href="https://github.com/emmelleppi/codrops-r3f-mirrors">GitHub</a>
          </div>
          <div className="frame__demos">
            <NavLink
              to="/panna"
              activeClassName="frame__demo--current"
              className="frame__demo"
            >
              PANNA
            </NavLink>
            <NavLink
              to="/olga"
              activeClassName="frame__demo--current"
              className="frame__demo"
            >
              OLGA
            </NavLink>
            <NavLink
              to="/pedro"
              activeClassName="frame__demo--current"
              className="frame__demo"
            >
              PEDRO
            </NavLink>

            <NavLink
              to="/facefilter"
              activeClassName="frame__demo--current"
              className="frame__demo"
            >
              FACEFILTER
            </NavLink>

            <NavLink
              to="/prose"
              activeClassName="frame__demo--current"
              className="frame__demo"
            >
              PROSE
            </NavLink>
          </div>
        </div>
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Redirect to="/panna" />
            </Route>
            <Route exact path="/panna">
              <App scene={1} />
            </Route>
            <Route exact path="/olga">
              <App scene={2} />
            </Route>
            <Route exact path="/pedro">
              <App scene={3} />
            </Route>
            <Route exact path="/facefilter">
              <App scene={4} />
            </Route>
            <Route exact path="/prose">
              <App scene={5} />
            </Route>
          </Switch>
        </div>
      </main>
    </Router>
  )
}

render(<Body />, document.querySelector("#root"))
