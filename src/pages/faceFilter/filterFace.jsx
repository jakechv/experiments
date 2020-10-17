import React, { Component } from "react"
import { Canvas, useFrame, useThree, useUpdate } from "react-three-fiber"
// import main script and neural network model from Jeeliz FaceFilter NPM package
import { JEEFACEFILTERAPI, NN_4EXPR } from "facefilter"

// import THREE.js helper, useful to compute pose
// The helper is not minified, feel free to customize it (and submit pull requests bro):
import JeelizThreeFiberHelper from "./helpers.js"

// max number of detected faces
const _maxFacesDetected = 1
const _faceFollowers = new Array(_maxFacesDetected)

let _timerResize = null

// This mesh follows the face. put stuffs in it.
// Its position and orientation is controlled by Jeeliz THREE.js helper
const FaceFollower = ({ faceIndex, expressions: { mouthOpen, mouthSmile } }) => {
  // This reference will give us direct access to the mesh
  const objRef = useUpdate((threeObject3D) => {
    _faceFollowers[faceIndex] = threeObject3D
  })

  return (
    <object3D ref={objRef}>
      <mesh name="mainCube">
        <boxBufferGeometry args={[1, 1, 1]} />
        <meshNormalMaterial />
      </mesh>

      <mesh
        name="mouthOpen"
        scale={[mouthOpen, 1, mouthOpen]}
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, -0.2, 0.2]}
      >
        <cylinderGeometry args={[0.3, 0.3, 1, 32]} />
        <meshBasicMaterial color={0xff0000} />
      </mesh>

      <mesh
        name="mouthSmile"
        scale={[mouthSmile, 1, mouthSmile]}
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, -0.2, 0.2]}
      >
        <cylinderGeometry
          args={[0.5, 0.5, 1, 32, 1, false, -Math.PI / 2, Math.PI]}
        />
        <meshBasicMaterial color={0xff0000} />
      </mesh>
    </object3D>
  )
}

// fake component, display nothing
// just used to get the Camera and the renderer used by React-fiber:
let _threeFiber = null
const DirtyHook = ({ sizing }) => {
  _threeFiber = useThree()
  useFrame(
    JeelizThreeFiberHelper.update_camera.bind(null, sizing, _threeFiber.camera)
  )
  return null
}

const mapN = (func, n) => new Array(n).fill(0).map((_, i) => func(i))

const computeSizing = () => {
  // compute  size of the canvas:
  const height = window.innerHeight
  const wWidth = window.innerWidth
  const width = Math.min(wWidth, height)

  // compute position of the canvas:
  const top = 0
  const left = (wWidth - width) / 2
  return { width, height, top, left }
}

class FilterFace extends Component {
  constructor(props) {
    super(props)

    // init state:
    const expressions = mapN(
      () => ({
        mouthOpen: 0,
        mouthSmile: 0,
        eyebrowFrown: 0,
        eyebrowRaised: 0,
      }),
      _maxFacesDetected
    )

    this.state = {
      sizing: computeSizing(),
      expressions,
    }

    // handle resizing / orientation change:
    this.handleResize = this.handleResize.bind(this)
    this.doResize = this.doResize.bind(this)
    window.addEventListener("resize", this.handleResize)
    window.addEventListener("orientationchange", this.handleResize)

    // bind this:
    this.callbackReady = this.callbackReady.bind(this)
    this.callbackTrack = this.callbackTrack.bind(this)
  }

  handleResize() {
    // do not resize too often:
    if (_timerResize) {
      clearTimeout(_timerResize)
    }
    _timerResize = setTimeout(this.doResize, 200)
  }

  doResize() {
    _timerResize = null
    const newSizing = compute_sizing()
    this.setState({ sizing: newSizing }, () => {
      if (_timerResize) return
      JEEFACEFILTERAPI.resize()
    })
  }

  callbackReady(errCode, spec) {
    if (errCode) {
      console.log("AN ERROR HAPPENS. ERR =", errCode)
      return
    }

    console.log("INFO: JEEFACEFILTERAPI IS READY")
    // there is only 1 face to track, so 1 face follower:
    JeelizThreeFiberHelper.init(spec, _faceFollowers, this.callbackDetect)
  }

  callbackTrack(detectStatesArg) {
    // if 1 face detection, wrap in an array:
    const detectStates = detectStatesArg.length ? detectStatesArg : [detectStatesArg]

    // update video and THREE faceFollowers poses:
    JeelizThreeFiberHelper.update(detectStates, _threeFiber.camera)

    // render the video texture on the faceFilter canvas:
    JEEFACEFILTERAPI.render_video()

    // get expressions factors:
    detectStates.forEach((detectState, faceIndex) => {
      const expr = detectState.expressions

      const newState = { ...this.state }
      const newExpressions = this.state.expressions.slice(0)
      newState.expressions = newExpressions

      newExpressions[faceIndex] = {
        // expressions depends on the neural net model
        mouthOpen: expr[0],
        mouthSmile: expr[1],

        eyebrowFrown: expr[2], // not used here
        eyebrowRaised: expr[3], // not used here
      }

      this.setState(newState)
    })
  }

  componentWillUnmount() {
    JEEFACEFILTERAPI.destroy()
  }

  callbackDetect(faceIndex, isDetected) {
    if (isDetected) {
      console.log("DETECTED")
    } else {
      console.log("LOST")
    }
  }

  componentDidMount() {
    // init FACEFILTER:
    const canvas = this.refs.faceFilterCanvas
    JEEFACEFILTERAPI.init({
      canvas,
      NNC: NN_4EXPR,
      maxFacesDetected: 1,
      followZRot: true,
      callbackReady: this.callbackReady,
      callbackTrack: this.callbackTrack,
    })
  }

  render() {
    // generate canvases:
    return (
      <div
        style={{
          fontSize: "1em",
          margin: 0,
          textAlign: "center",
          overflow: "hidden",
          backgroundColor: "silver",
        }}
      >
        {/* Canvas managed by three fiber, for AR: */}
        <Canvas
          style={{
            position: "fixed",
            zIndex: 2,
            ...this.state.sizing,
          }}
        >
          <DirtyHook sizing={this.state.sizing} />
          <FaceFollower faceIndex={0} expressions={this.state.expressions[0]} />
        </Canvas>

        {/* Canvas managed by FaceFilter, just displaying the video (and used for WebGL computations) */}
        <canvas
          ref="faceFilterCanvas"
          style={{
            position: "fixed",
            zIndex: 1,
            ...this.state.sizing,
          }}
          width={this.state.sizing.width}
          height={this.state.sizing.height}
        ></canvas>
      </div>
    )
  }
}

export default FilterFace
