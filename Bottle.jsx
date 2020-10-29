// https://mobile.twitter.com/0xca0a/status/1319018502188158976

import React, { useState } from "react"

const Bottle = ({ initial, glas, cap, liquid, children, ...props }) => {
  const nodes = useGLTF()
  const [hovered, set] = useState(false)
  useEffect(
    () =>
      void (document.body.style.cursor = hovered
        ? `url(${hoveredCursor}), pointer`
        : `url(${defaultCursor}), auto)`),
    [hovered]
  )

  return (
    <group
      {...props}
      onPointerOver={(e) => (e.stopPropagation(), set(true))}
      onPointerOut={(e) => set(false)}
    >
      <group>
        <mesh geometry={nodes[glas].geometry} />
        <mesh geometry={nodes[liquid].geometry} />
        <mesh geometry={nodes[glas].geometry} />
        <mesh geometry={nodes[cap].geometry} />
      </group>
    </group>
  )
}

export default Bottle
