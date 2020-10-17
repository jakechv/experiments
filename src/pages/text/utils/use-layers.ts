import { useEffect, useRef } from "react"

function useLayers(layers = [0]) {
  const reference = useRef()

  useEffect(() => {
    // @ts-ignore
    reference.current.layers.disableAll()

    layers.sort().forEach((layer) => {
      // @ts-ignore
      reference.current.layers.enable(layer)
    })
  })

  return reference
}

export default useLayers
