import React, { useMemo } from "react"
import * as THREE from "three"
import { useFrame } from "react-three-fiber"
import { Text, useMatcapTexture, Octahedron, useGLTFLoader } from "@react-three/drei"

import useSlerp from "./use-slerp"
import useRenderTarget from "./use-render-target"
import { ThinFilmFresnelMap } from "./thinFilmFresnelMap"
import { mirrorsData as diamondsData } from "./data"
import useLayers from "./use-layers"

const TEXT_PROPS = {
  fontSize: 5,
  font: "https://fonts.gstatic.com/s/monoton/v10/5h1aiZUrOngCibe4TkHLRA.woff",
}

function Title({
  material,
  texture,
  map,
  layers,
  ...props
}: {
  material: THREE.Material
  texture: THREE.Texture
  map: THREE.Texture
  layers: [number]
}) {
  const textReference = useLayers(layers)

  return (
    <group {...props}>
      <Text
        ref={textReference}
        name="text-olga"
        // @ts-ignore
        depthTest={false}
        position={[0, -1, 0]}
        {...TEXT_PROPS}
      >
        OLGA
        <meshPhysicalMaterial
          envMap={texture}
          map={map}
          roughness={0}
          metalness={1}
          color="#FFFFFF"
        />
      </Text>
    </group>
  )
}

function Diamond({
  map,
  texture,
  matcap,
  layers,
  ...props
}: {
  map: THREE.Texture
  texture: THREE.Texture
  matcap: THREE.Texture
  layers: [number]
}) {
  const reference = useLayers(layers)

  useFrame(() => {
    if (reference.current) {
      // @ts-ignore
      reference.current.rotation.y += 0.001
      // @ts-ignore
      reference.current.rotation.z += 0.01
    }
  })

  return (
    <mesh ref={reference} {...props}>
      <meshMatcapMaterial
        matcap={matcap}
        transparent
        opacity={0.9}
        color="#14CEFF"
      />
    </mesh>
  )
}

function Diamonds({ layers, ...props }: { layers: [number] }) {
  // @ts-ignore
  const [matcapTexture]: [THREE.Texture] = useMatcapTexture(
    "2E763A_78A0B7_B3D1CF_14F209"
  )
  // @ts-ignore
  const { nodes } = useGLTFLoader(`${process.env.PUBLIC_URL}/diamond.glb`)

  return (
    <group name="diamonds" {...props}>
      {diamondsData.mirrors.map((mirror, index) => (
        <Diamond
          key={`diamond-${index}`}
          name={`diamond-${index}`}
          {...mirror}
          // @ts-ignore
          geometry={nodes.Cylinder.geometry}
          matcap={matcapTexture}
          scale={[0.5, 0.5, 0.5]}
          layers={layers}
        />
      ))}
    </group>
  )
}

function Background({
  layers,
  ...props
}: {
  layers: [number, number]
  position: [number, number, number]
}) {
  const reference = useLayers(layers)
  // @ts-ignore
  const [matcapTexture]: [THREE.Texture] = useMatcapTexture(
    "BA5DBA_F2BEF2_E69BE6_DC8CDC"
  )

  return (
    // @ts-ignore
    <Octahedron ref={reference} name="background" args={[20, 4, 4]} {...props}>
      <meshMatcapMaterial
        matcap={matcapTexture}
        side={THREE.BackSide}
        color="#FFFFFF"
      />
    </Octahedron>
  )
}

function Scene() {
  const [cubeCamera, renderTarget] = useRenderTarget()
  const thinFilmFresnelMap = useMemo(
    () =>
      // @ts-ignore
      new ThinFilmFresnelMap(410, 0, 5, 1024),
    []
  )

  const group = useSlerp()

  return (
    <>
      <Background layers={[0, 11]} position={[0, 0, -5]} />
      <cubeCamera
        layers={[11]}
        name="cubeCamera"
        // @ts-ignore
        ref={cubeCamera}
        // @ts-ignore
        args={[0.1, 100, renderTarget]}
        position={[0, 0, -12]}
      />

      <group name="sceneContainer" ref={group}>
        <Diamonds
          // @ts-ignore
          layers={[0, 11]}
        />
        <group name="text" position={[0, 0, -5]}>
          <Title
            layers={[0]}
            // @ts-ignore
            name="title"
            // @ts-ignore
            texture={renderTarget.texture}
            map={thinFilmFresnelMap}
          />
        </group>
      </group>
    </>
  )
}

export default Scene
