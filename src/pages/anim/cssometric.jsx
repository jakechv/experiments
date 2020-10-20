import React, { useState } from "react"

import { mapN } from "../../utils"

// codepen.io/hexagoncircle/pen/gOMrbOR

const main = {
  transformStyle: "preserve-3d",
  transform: "rotateX(45deg) rotateZ(45deg)",
}

const cubeStyles = ({ size, bgColor, offset, duration, delay, ease }) => ({
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "1rem",
  width: size,
  height: size,
  backgroundColor: bgColor,
  boxShadow: "inset rgba(black, 0.15) -0.5rem 0.5rem 1rem",
  transformStyle: "preserve-3d",
  transformOrigin: `50% 100% var(${offset})`,
  transitionProperty: "transform, background-color",
  transitionTimingFunction: "ease-out",

  animation: `animate ${duration} ${delay} ${ease} alternate infinite,
    color ${duration * 2} ${delay} ${ease} infinite`,
})

const bgBoxColors = ["hsl(0, 54%, 61%)", "hsl(59, 94%, 57%)", "hsl(230, 92%, 61%)"]

const cubeBeforeAfter = ({ before, offset }) => ({
  content: "",
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "inherit",
  boxShadow: "inherit",
  transformOrigin: "100% 100%",

  transform: `translateZ(${offset}) ${
    before ? "rotateY(90deg)" : "rotateX(-90deg)"
  }`,

  filter: `brightness(${before ? "120" : "80"}%)`,
})

const body = {
  height: "100%",
  display: "grid",
  placeItems: "center",
  backgroundColor: "hsl(0, 0%, 10%)",
  overflow: "hidden",
}

const CSSOMetric: React.ReactNode = () => {
  const [state, setState] = useState({
    size: "3rem",
    offset: `calc(${size} * -1)`,
    duration: "3600ms",
    delay: `calc(var(--i) * -0.0335s)`,
    ease: `cubic-bezier(0.84, 0, 0.2, 1)`,
    bgColor: "",
  })

  return (
    <div style={body}>
      {mapN((i) => {
        const style = { color: bgBoxColors[i % 3] }
        return <div style={style} />
      }, 10)}
    </div>
  )
}

export default CSSOMetric

// @keyframes animate {
//   0% {
//     transform: scaleX(4);
//   }
//   20% {
//     transform: scaleX(0.5) scaleY(0.6) scaleZ(0.5);
//   }
//   40% {
//     transform: scaleX(1) scaleY(0.8) scaleZ(4);
//   }
//   60% {
//     transform: scaleX(4) scaleY(0.6) scaleZ(4);
//   }
//   80% {
//     transform: scaleX(4) scaleZ(1) translateY(calc(var(--size) * 2));
//   }
//   100% {
//     transform: scaleX(1) scaleY(0.5) scaleZ(1) translateY(calc(var(--size) * -2));
//   }
// }

// @keyframes color {
//   42% { background-color: var(--bg-color); }
//   48%, 64% { background-color: hsl(0, 0%, 100%); }
//   66% { background-color: var(--bg-color); }
// }
