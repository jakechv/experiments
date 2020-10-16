import React from "react"
import { ScribbleCircleLink } from "../components/link"

import Quote from "../components/quote"

const yohji = (link) => (
  <>
    ― {"   "}
    <ScribbleCircleLink url={link}>Yohji</ScribbleCircleLink>
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
      author={yohji("https://www.powells.com/book/yamamoto-yohji-9780847843541")}
    />
    <Quote
      quoteLines={[
        `Black is modest and arrogant at the same time.`,
        `Black is lazy and easy - but mysterious.`,
        `But above all black says this: "I don’t bother you - don’t bother me".`,
      ]}
      author={yohji(
        "https://www.powells.com/book/yohji-yamamoto-my-dear-bomb-9789055449798"
      )}
    />
    <Quote
      quoteLines={[
        "Start copying what you love.",
        "Copy copy copy copy.",
        "At the end of the copy you will find yourself.",
      ]}
      author={yohji("https://www.powells.com/book/talking-to-myself-9783882438253")}
    />
    <Quote
      quoteLines={[
        "With my eyes turned to the past, I walk backwards into the future.",
      ]}
      author={yohji("https://www.youtube.com/watch?v=RAoYM6Fcnaw")}
    />
  </div>
)

export default Prose
