import React from "react"
import { ScribbleCircleLink } from "../components/link"

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
