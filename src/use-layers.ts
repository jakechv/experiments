import { useEffect, useRef } from "react"

function useLayers(layers = [0]) {
  const ref = useRef()

  useEffect(() => {
    // @ts-ignore
    ref.current.layers.disableAll()

    layers.sort().forEach((layer) => {
      // @ts-ignore
      ref.current.layers.enable(layer)
    })
  })

  return ref
}

export default useLayers
