import React from "react"
import { ScribbleCircleLink } from "../components/link"

import Quote from "../components/quote"

const yohji = (
  <>
    ― {"   "}
    <ScribbleCircleLink url="https://google.com">Yohji</ScribbleCircleLink>
    {"   "}
    Yamamoto
  </>
)

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
    <Quote
      quoteLines={[
        "I think perfection is ugly.",
        "Somewhere in the things humans make, I want to see",
        "scars, failure, disorder, distortion.",
      ]}
      author={yohji}
    />
    <Quote
      quoteLines={[
        `Black is modest and arrogant at the same time.`,
        `Black is lazy and easy - but mysterious.`,
        `But above all black says this: "I don’t bother you - don’t bother me".`,
      ]}
      author={yohji}
    />
    <Quote
      quoteLines={[
        "Start copying what you love.",
        "Copy copy copy copy.",
        "At the end of the copy you will find yourself.",
      ]}
      author={yohji}
    />
    <Quote
      quoteLines={[
        "With my eyes turned to the past, I walk backwards into the future.",
      ]}
      author={yohji}
    />
  </div>
)

export default Prose
