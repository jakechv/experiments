import React, { useEffect, useMemo, useRef } from "react"
import * as THREE from "three"
import { useResource } from "react-three-fiber"
import { Text, Box, Octahedron, Plane } from "@react-three/drei"
import { Physics, useBox, usePlane } from "@react-three/cannon"

import useSlerp from "./use-slerp"
import useRenderTarget from "./use-render-target"
import useLayers from "./use-layers"

const textProps = {
  fontSize: 4,
  font: "https://fonts.gstatic.com/s/kanit/v7/nKKU-Go6G5tXcr4WPBWnVac.woff",
}
const BG_COLOR = "#921212"
const PEDRO_COLOR = "#aaa"
const CLICKHERE_COLOR = "#f70131"
const REFLECTION_SIDE_COLOR = "#929292"
const DARK_SIDE_COLOR = "#921212"

function Title({
  layers,
  label = "",
  color = 0xffffff,
  ...props
}: {
  layers: [number]
  label: string
  color: any
}) {
  const group = useRef()

  useEffect(() => {
    // @ts-ignore
    group.current.lookAt(0, 0, 0)
  }, [])

  return (
    <group {...props} ref={group}>
      <Text
        castShadow
        name={label}
        // @ts-ignore
        depthTest={false}
        material-toneMapped={false}
        {...textProps}
        layers={layers}
      >
        {label}
        <meshBasicMaterial color={color} />
      </Text>
    </group>
  )
}

function TitleCopies({
  layers,
  label,
  color,
  ...props
}: {
  layers: [number]
  position: [number, number, number]
  rotation: [number, number, number]
  label: string
  color: any
}) {
  const vertices = useMemo(() => {
    const y = new THREE.CircleGeometry(10, 4, 4)
    return y.vertices
  }, [])

  return (
    <group name="titleCopies" {...props}>
      {vertices.map((vertex, i) => (
        <Title
          // @ts-ignore
          name={"titleCopy-" + i}
          key={"titleCopy-" + i}
          label={label}
          position={vertex}
          layers={layers}
          color={color}
        />
      ))}
    </group>
  )
}

function PhysicalWalls(props: any) {
  usePlane(() => ({ ...props }))

  // back wall
  usePlane(() => ({ position: [0, 0, -20] }))

  return (
    <Plane args={[1000, 1000]} {...props} receiveShadow>
      <shadowMaterial transparent opacity={0.2} />
    </Plane>
  )
}

function PhysicalTitle(props: any) {
  useBox(() => ({ ...props }))
  return null
}

function Mirror({
  sideMaterial,
  reflectionMaterial,
  ...props
}: {
  sideMaterial: THREE.Material
  reflectionMaterial: THREE.Material
}) {
  const [ref, api] = useBox(() => props)

  return (
    <Box
      ref={ref}
      // @ts-ignore
      args={props.args}
      onClick={() => api.applyImpulse([0, 0, -50], [0, 0, 0])}
      receiveShadow
      castShadow
      material={[
        sideMaterial,
        sideMaterial,
        sideMaterial,
        sideMaterial,
        reflectionMaterial,
        sideMaterial,
      ]}
    />
  )
}

function Mirrors({ envMap }: any) {
  const ROWS = 4
  const COLS = 10
  const BOX_SIZE = 2

  const sideMaterial = useResource()
  const reflectionMaterial = useResource()

  const mirrorsData = useMemo(
    () =>
      new Array(ROWS * COLS).fill(null).map((_, index) => ({
        mass: 1,
        material: { friction: 1, restitution: 0 },
        args: [BOX_SIZE, BOX_SIZE, BOX_SIZE],
        position: [
          -COLS + ((index * BOX_SIZE) % (BOX_SIZE * COLS)),
          -1 + BOX_SIZE * Math.floor((index * BOX_SIZE) / (BOX_SIZE * COLS)),
          0,
        ],
      })),
    []
  )

  return (
    <>
      <meshPhysicalMaterial
        // @ts-ignore
        ref={sideMaterial}
        color={DARK_SIDE_COLOR}
        envMap={envMap}
        roughness={0.8}
        metalness={0.2}
      />
      <meshPhysicalMaterial
        // @ts-ignore
        ref={reflectionMaterial}
        envMap={envMap}
        roughness={0}
        metalness={1}
        color={REFLECTION_SIDE_COLOR}
      />
      <group name="mirrors">
        {mirrorsData.map((mirror, index) => (
          <Mirror
            key={`0${index}`}
            name={`mirror-${index}`}
            {...mirror}
            // @ts-ignore
            sideMaterial={sideMaterial.current}
            // @ts-ignore
            reflectionMaterial={reflectionMaterial.current}
          />
        ))}
      </group>
    </>
  )
}

function Background({
  layers,
  ...props
}: {
  layers: [number, number]
  position: [number, number, number]
}) {
  const ref = useLayers(layers)
  return (
    <Octahedron ref={ref} name="background" args={[100]} {...props}>
      <meshBasicMaterial color={BG_COLOR} side={THREE.BackSide} />
    </Octahedron>
  )
}

export default function Scene() {
  const group = useSlerp()
  const [cubeCamera, renderTarget] = useRenderTarget()

  return (
    <>
      <group name="sceneContainer" ref={group}>
        <Background layers={[0, 11]} position={[0, 0, -5]} />
        <cubeCamera
          layers={[11]}
          name="cubeCamera"
          // @ts-ignore
          ref={cubeCamera}
          position={[0, 0, 0]}
          // @ts-ignore
          args={[0.1, 100, renderTarget]}
        />

        <Title
          // @ts-ignore
          name="title"
          label="PEDRO"
          position={[0, 2, -10]}
          color={PEDRO_COLOR}
        />
        <TitleCopies
          position={[0, 2, -5]}
          rotation={[0, 0, 0]}
          layers={[11]}
          label="PEDRO"
          color={PEDRO_COLOR}
        />

        <Title
          layers={[11]}
          // @ts-ignore
          name="title"
          label="CLICK HERE"
          position={[0, 2, 24]}
          scale={[-1, 1, 1]}
          color={CLICKHERE_COLOR}
        />

        <Physics gravity={[0, -10, 0]}>
          // @ts-ignore
          <Mirrors // @ts-ignore
            envMap={renderTarget.texture}
          />
          // @ts-ignore
          <PhysicalWalls rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} />
          // @ts-ignore
          <PhysicalTitle args={[13, 2.5, 0.1]} position={[0, 2.25, -10]} />
        </Physics>
      </group>

      <pointLight
        castShadow
        position={[0, 10, 2]}
        intensity={4}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={100}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
    </>
  )
}
