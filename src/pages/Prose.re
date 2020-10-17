[@bs.module "../components/quote/quote.tsx"][@react.component]
external quote: (~author: React.element, ~quoteLines: list(React.element)) => React.element = "quote";

[@react.component]
  let make = () => {
    let author = <div>{React.string("jk rowling")}</div>;
    let quoteLines = [|React.string("one"), React.string("two")|];
    <quote
        author={author}
        quoteLines={quoteLines}
    />
  }

  let default = make;
