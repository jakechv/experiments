import React, { useState } from "react"

const scribbleLinkStyles = ({ hovered }) => ({
  scribbleLink: {
    display: "inlineBlock",
    position: "relative",
    textDecoration: "none",
    color: "inherit",
    margin: `0 ${hovered ? "4px" : "0px"}`,
    transition: "margin 0.25s",
  },
  scribbleIcon: {
    width: "76px",
    height: "40px",
    position: "absolute",
    left: "50%",
    bottom: 0,
    transform: "translate(-50%, 7px) translateZ(0)",
    fill: "none",
    stroke: hovered ? "#275efe" : "#bbc1e1",
    strokeLinecap: "round",
    strokeWidth: "2px",
    strokeDasharray: `${hovered ? "180px" : "69px"} 278px`,
    strokeDashoffset: "361px",
    transition: `stroke 0.25s ease ${
      hovered ? "0.1s" : "0s"
    }, stroke-dasharray 0.35s`,
  },
})

const ScribbleCircleLink = ({ url, children }) => {
  const [styles, setStyles] = useState(scribbleLinkStyles({ hovered: false }))
  return (
    <a
      href={url}
      style={styles.scribbleLink}
      onMouseEnter={() => setStyles(scribbleLinkStyles({ hovered: true }))}
      onMouseLeave={() => setStyles(scribbleLinkStyles({ hovered: false }))}
    >
      {children}
      <svg viewBox="0 0 70 36" style={styles.scribbleIcon}>
        <path d="M6.9739 30.8153H63.0244C65.5269 30.8152 75.5358 -3.68471 35.4998 2.81531C-16.1598 11.2025 0.894099 33.9766 26.9922 34.3153C104.062 35.3153 54.5169 -6.68469 23.489 9.31527" />
      </svg>
    </a>
  )
}

const Prose = () => (
  <div
    style={{
      color: "black",
      fontSize: "18px",
      margin: 0,
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      fontFamily: "Inter",
      justifyContent: "center",
      alignItems: "center",
      background: "#f6f8ff",
    }}
  >
    <div>
      "I think perfection is ugly.
      <br />
      <br />
      Somewhere in the things humans make, I want to see
      <br />
      scars, failure, disorder, distortion."
      <br />
      <br />
    </div>
    <div>
      ― {"   "}
      <ScribbleCircleLink url="https://google.com">Yohji</ScribbleCircleLink>
      {"   "}
      Yamamoto
    </div>
    <div />
  </div>
)

export default Prose
