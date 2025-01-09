import { Global, css } from "@emotion/react";
import Calendar from "./components/Calendar";

const globalStyles = css`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    background-color: #f4f5f7;
    color: #172b4d;
  }
`;

function App() {
  return (
    <>
      <Global styles={globalStyles} />
      <Calendar />
    </>
  );
}

export default App;
