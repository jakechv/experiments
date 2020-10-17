import React, { Suspense } from "react"
import { render } from "react-dom"
import { Canvas } from "react-three-fiber"
import { useProgress, Html } from "@react-three/drei"
import { AppContainer } from "react-hot-loader"
import {
  HashRouter as Router,
  Switch,
  Route,
  // NavLink,
  Redirect,
} from "react-router-dom"

import Prose from "./pages/prose"
import FaceFilter from "./pages/faceFilter"
import Scene1 from "./pages/Scene1"
import Scene2 from "./pages/Scene2"
import Scene3 from "./pages/Scene3"

import "./base.css"

const a = Number("#000")

function Loader() {
  const { progress } = useProgress()

  return (
    <Html center>
      <span style={{ color: "#FFFFFF" }}>{progress} % loaded</span>
    </Html>
  )
}

const ThreeCanvas = ({ children }: { children: React.ReactNode }) => (
  <Canvas concurrent shadowMap camera={{ position: [0, 0, 5], fov: 70 }}>
    <color attach="background" args={[a, a, a]} />
    <Suspense fallback={<Loader />}>{children}</Suspense>
    <ambientLight intensity={0.4} />
  </Canvas>
)

function App({ scene = 1 }) {
  return (
    <>
      {scene === 1 && (
        <ThreeCanvas>
          <Scene1 />
        </ThreeCanvas>
      )}
      {scene === 2 && (
        <ThreeCanvas>
          <Scene2 />
        </ThreeCanvas>
      )}
      {scene === 3 && (
        <ThreeCanvas>
          <Scene3 />
        </ThreeCanvas>
      )}
      {scene === 4 && (
        <AppContainer>
          <FaceFilter />
        </AppContainer>
      )}
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
              <Redirect to="/olga" />
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
