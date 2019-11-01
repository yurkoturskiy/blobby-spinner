import React from "react";

function FooterCaption(props) {
  return (
    <h1 className="caption">
      Made with <span id="heart">&#9829;</span> and{" "}
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/guandjoy/primitivo-svg"
        className="primitivo"
      >
        Primitivo-SVG
      </a>
    </h1>
  );
}

export default FooterCaption;
