import React, { useState, useEffect, useMemo } from "react";
import { morphing } from "primitivo-svg";

function Spinner(props) {
  const [width, setWidth] = useState(128);
  const [height, setHeight] = useState(128);
  const [pathsVisibility, setPathVisibility] = useState([]);

  const durPerPath = props.duration / (props.numOfKeyPaths * 2 - 1);
  const numOfColors = props.colors.length;
  const animateColorDuration =
    numOfColors * durPerPath - props.shiftStep * props.numOfShapes + "ms";

  useEffect(() => {
    setPathVisibility(pathsVisibility => {
      var proto = [];
      for (let i = 0; i < props.numOfShapes; i++) {
        proto[i] = setTimeout(() => true, props.shiftStep * i);
      }
      return proto;
    });
  }, []);

  const morphParams = {
    numOfKeyPaths: props.numOfKeyPaths,
    loop: true
  };
  var keySplines = [];
  var keyTimes = [];
  var numOfKeyTimes = morphParams.numOfKeyPaths * 2 - 2;
  var keyTimesFactor = 1 / numOfKeyTimes;
  for (let i = 0; i < morphParams.numOfKeyPaths * 2 - 1; i++) {
    keyTimes[i] = i * keyTimesFactor;
  }
  for (let i = 0; i < morphParams.numOfKeyPaths * 2 - 2; i++) {
    keySplines[i] = "0.25 0 0.75 1";
  }
  keySplines = keySplines.join(";");
  keyTimes = keyTimes.join(";");

  const pathParams = {
    numOfSegments: props.numOfPathSegments,
    depth: 0,
    x: 0,
    y: 0,
    width,
    height,
    centerX: width / 2,
    centerY: height / 2,
    rotate: [0, 90],
    numOfGroups: 1,
    groups: [
      {
        type: "radial",
        incircle: true,
        round: props.round,
        distance: [1 - props.contrast, 1]
      }
    ]
  };
  const blob = useMemo(() => morphing(morphParams, pathParams), []);

  const animateColorValues = props.colors.join(";");
  const animatePathDuration = props.duration + "ms";
  var paths = [];
  for (let i = 0; i < props.numOfShapes; i++) {
    paths.push(
      pathsVisibility[i] && (
        <path key={i} fill="#3688FF" opacity="1">
          <animate
            begin={props.shiftStep * i + "ms"}
            attributeName="opacity"
            dur="100ms"
            repeatCount="1"
            from="0"
            to="1"
          />
          <animate
            begin={props.shiftStep * i + "ms"}
            attributeName="d"
            dur={animatePathDuration}
            repeatCount="indefinite"
            calcMode="linear"
            keyTimes={keyTimes}
            keySplines={keySplines}
            values={blob.dValues}
          />
          <animate
            begin={props.shiftStep * i + "ms"}
            attributeName={props.type}
            values={animateColorValues}
            dur={animateColorDuration}
            repeatCount="indefinite"
          />
        </path>
      )
    );
  }

  return (
    <div className="spinner">
      <svg viewBox={`0 0 ${width} ${height}`}>{paths}</svg>
      {props.lable && <span>{props.lable}</span>}
    </div>
  );
}

export default Spinner;
