import { render } from "react-dom"
import React, { Suspense } from "react"
import dynamic from "next/dynamic"
import { Canvas } from "react-three-fiber"

const { useProgress, Html } = dynamic(() => import("@react-three/drei"), {
  ssr: false,
})

import Scene1 from "./Scene1"
import Scene2 from "./Scene2"
import Scene3 from "./Scene3"

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
      </Suspense>
      <ambientLight intensity={0.4} />
    </Canvas>
  )
}

function Index() {
  return (
    <main>
      <div className="frame">
        <div className="frame__title-wrap">
          <h1 className="frame__title">Awesome Mirror Effect</h1>
          <p className="frame__tagline">A react-three-fiber based demo</p>
        </div>
        <div className="frame__links">
          <a href="https://tympanus.net/Development/MenuFullGrid/">Previous demo</a>
          <a href="https://tympanus.net/codrops/?p=51167">Article</a>
          <a href="https://github.com/emmelleppi/codrops-r3f-mirrors">GitHub</a>
        </div>
      </div>
    </main>
  )
}

export default Index
