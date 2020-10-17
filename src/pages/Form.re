[@react.component]
let make = (~name) => <button> {ReasonReact.string("Hello " ++ name ++ "!")} </button>

let default = make;
