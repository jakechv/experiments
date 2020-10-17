import React, { useEffect, useMemo, useRef, useState } from "react"
import * as THREE from "three"
import { useFrame, useResource } from "react-three-fiber"
import { Text, Box, useMatcapTexture, Octahedron } from "@react-three/drei"

import useSlerp from "./utils/use-slerp"
import useLayers from "./utils/use-layers"
import useRenderTarget from "./utils/use-render-target"
import { ThinFilmFresnelMap } from "./utils/thinFilmFresnelMap"
import { mirrorsData } from "./utils/data"

const TEXT_PROPS = {
  fontSize: 2.5,

  font:
    "https://fonts.gstatic.com/s/syncopate/v12/pe0pMIuPIYBCpEV5eFdKvtKqBP5p.woff",
}

function Title(props: { layers: [number] }) {
  const { layers } = props
  const group = useRef()

  useEffect(() => {
    // @ts-ignore
    group.current.lookAt(0, 0, 0)
  }, [])

  const textReference = useLayers(layers)

  return (
    <group {...props} ref={group}>
      <Text
        ref={textReference}
        name="text-panna"
        // @ts-ignore
        depthTest={false}
        material-toneMapped={false}
        material-color="#FFFFFF"
        {...TEXT_PROPS}
      >
        PANNA
      </Text>
    </group>
  )
}

function Mirror({
  sideMaterial,
  reflectionMaterial,
  args,
  layers,
  ...props
}: {
  sideMaterial: THREE.Material
  reflectionMaterial: THREE.Material
  args: [number]
  layers: [number]
}) {
  const reference = useLayers(layers)

  useFrame(() => {
    if (reference.current) {
      // @ts-ignore
      if (reference.current.rotation) {
        // @ts-ignore
        reference.current.rotation.y += 0.001
        // @ts-ignore
        reference.current.rotation.z += 0.01
      }
    }
  })

  return (
    <Box
      {...props}
      ref={reference}
      args={args}
      material={[
        sideMaterial,
        sideMaterial,
        sideMaterial,
        sideMaterial,
        reflectionMaterial,
        reflectionMaterial,
      ]}
    />
  )
}

function Mirrors({
  envMap: environmentMap,
  layers,
  ...props
}: {
  envMap: THREE.Texture
  layers: [number]
}) {
  // @ts-ignore
  const [thinFilmFresnelMap]: [THREE.Texture] = useState(new ThinFilmFresnelMap())
  const sideMaterial = useResource()
  const reflectionMaterial = useResource()

  return (
    <group name="mirrors" {...props}>
      <meshLambertMaterial
        // @ts-ignore
        ref={sideMaterial}
        // @ts-ignore
        map={thinFilmFresnelMap}
        color="#AAAAAA"
      />
      <meshLambertMaterial
        // @ts-ignore
        ref={reflectionMaterial}
        map={thinFilmFresnelMap}
        envMap={environmentMap}
        color="#FFFFFF"
      />
      {mirrorsData.mirrors.map((mirror, index) => (
        <Mirror
          key={`mirror-${index}`}
          layers={layers}
          {...mirror}
          name={`mirror-${index}`}
          // @ts-ignore
          sideMaterial={sideMaterial.current}
          // @ts-ignore
          reflectionMaterial={reflectionMaterial.current}
        />
      ))}
    </group>
  )
}

function TitleCopies({ layers }: { layers: [number] }) {
  const vertices = useMemo(() => {
    const y = new THREE.IcosahedronGeometry(10)

    return y.vertices
  }, [])

  return (
    <group name="titleCopies">
      {vertices.map((vertex, i) => (
        // @ts-ignore
        <Title
          key={`titleCopy-${i}`}
          // @ts-ignore
          name={`titleCopy-${i}`}
          position={vertex}
          layers={layers}
        />
      ))}
    </group>
  )
}

function Scene() {
  const [cubeCamera, renderTarget] = useRenderTarget()
  const group = useSlerp()

  // @ts-ignore
  const [matcapTexture]: [THREE.Texture] = useMatcapTexture(
    "C8D1DC_575B62_818892_6E747B"
  )

  return (
    <group name="sceneContainer" ref={group}>
      <Octahedron
        layers={[11]}
        name="background"
        // @ts-ignore
        args={[20, 4, 4]}
        position={[0, 0, -5]}
      >
        <meshMatcapMaterial
          matcap={matcapTexture}
          side={THREE.BackSide}
          transparent
          opacity={0.3}
          color="#FFFFFF"
        />
      </Octahedron>
      <cubeCamera
        layers={[11]}
        name="cubeCamera"
        // @ts-ignore
        ref={cubeCamera}
        // @ts-ignore
        args={[0.1, 100, renderTarget]}
        position={[0, 0, 5]}
      />
      <Title
        // @ts-ignore
        name="title"
        position={[0, 0, -10]}
      />
      <TitleCopies layers={[11]} />
      // @ts-ignore
      <Mirrors
        // @ts-ignore
        layers={[0, 11]}
        // @ts-ignore
        envMap={renderTarget.texture}
      />
    </group>
  )
}

export default Scene
