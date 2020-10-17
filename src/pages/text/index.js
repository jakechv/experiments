import React, { Suspense } from "react"
import { HashRouter as Route, Redirect } from "react-router-dom"
import { Canvas } from "react-three-fiber"
import { useProgress, Html } from "@react-three/drei"

import Scene1 from "./Scene1"
import Scene2 from "./Scene2"
import Scene3 from "./Scene3"

const a = Number("#000")

const Loader = () => {
  const { progress } = useProgress()

  return (
    <Html center>
      <span style={{ color: "#FFFFFF" }}>{progress} % loaded</span>
    </Html>
  )
}

// : { children: React.ReactNode }
const ThreeCanvas = ({ children }) => (
  <div
    style={{
      width: "100%",
      height: "100%",
      margin: 0,
      padding: 0,
      background: "#333",
      boxSizing: "border-box",
    }}
  >
    <Canvas concurrent shadowMap camera={{ position: [0, 0, 5], fov: 70 }}>
      <color attach="background" args={[a, a, a]} />
      <Suspense fallback={<Loader />}>{children}</Suspense>
      <ambientLight intensity={0.4} />
    </Canvas>
  </div>
)

const App = ({ scene = 1 }) => (
  <ThreeCanvas>
    {scene === 1 && <Scene1 />}
    {scene === 2 && <Scene2 />}
    {scene === 3 && <Scene3 />}
  </ThreeCanvas>
)

const TextRoutes = ({ match: { url } }) => (
  <>
    <Route exact path={url}>
      <Redirect to={`${url}/scene1`} />
    </Route>
    <Route exact path={`${url}/scene1`} component={<App scene={1} />} />
    <Route exact path={`${url}/scene2`} component={<App scene={2} />} />
    <Route exact path={`${url}/scene3`} component={<App scene={3} />} />
  </>
)

export default TextRoutes
