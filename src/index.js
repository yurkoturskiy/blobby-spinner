import React from "react";
import ReactDOM from "react-dom";
import Spinner from "./Spinner";
import FooterCaption from "./FooterCaption";

import "./styles.css";

function App() {
  return (
    <>
      <Spinner
        duration={13000}
        shiftStep={200}
        numOfKeyPaths={12}
        numOfShapes={6}
        colors={["#3688FF", "#FF546C", "#22D163", "#3688FF"]}
        contrast={1}
        round={0.6}
        numOfPathSegments={6}
        type={"fill"}
        lable={false}
      />
      <FooterCaption />
    </>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
