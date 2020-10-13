import { useMemo, useRef } from "react"
import { RGBAFormat, WebGLCubeRenderTarget } from "three"
import { useFrame } from "react-three-fiber"

function useRenderTarget(settings = {}) {
  const renderTarget = useMemo(() => {
    const renderTargetSettings = {
      format: RGBAFormat,
      generateMipmaps: true,
    }

    return new WebGLCubeRenderTarget(1024, {
      ...renderTargetSettings,
      ...settings,
    })
  }, [settings])

  const cubeCamera = useRef()

  useFrame(({ gl, scene }) => {
    if (!cubeCamera.current) return

    // @ts-ignore
    cubeCamera.current.update(gl, scene)
  })

  return [cubeCamera, renderTarget]
}

export default useRenderTarget
