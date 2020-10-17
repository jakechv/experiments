import React from "react"

const Quote: React.SFC<{
  author: React.ReactNode
  quoteLines: React.ReactNode[]
}> = ({
  author,
  quoteLines,
}: {
  author: React.ReactNode
  quoteLines: React.ReactNode[]
}) => (
  <div>
    <br />
    {quoteLines.map((quoteLine, key) => (
      <div key={key}>{quoteLine}</div>
    ))}
    <br />
    <div>{author}</div>
    <br />
  </div>
)

export default Quote
