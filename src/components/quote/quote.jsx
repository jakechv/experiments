import React from "react"

const Quote = ({ author, quoteLines }) => (
  <div>
    <br />
    {quoteLines.map((quoteLine) => (
      <div>{quoteLine}</div>
    ))}
    <br />
    <div>{author}</div>
    <br />
  </div>
)

export default Quote
