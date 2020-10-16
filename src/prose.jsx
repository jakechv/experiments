import React, { useState } from "react"
import "./prose.css"
const text = "#2b3044"
const line = "#bc1e1"
const lineActive = "#275efe"

const ScribbleCircleLink = ({ url, children }) => {
  return (
    <a href={url} className="scribbleLink">
      {children}
      <svg viewBox="0 0 70 36" className="scribbleIcon">
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
    <ScribbleCircleLink url="https://google.com">
      ― Yohji Yamamoto
    </ScribbleCircleLink>
  </div>
)

export default Prose
