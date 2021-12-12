import React, { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = function (secondMode, replace = false) {
    if (replace) {
      return setMode(secondMode);
    }
    setHistory([...history, secondMode]);
    return setMode(secondMode);
  };

  const back = function () {
    if (history.length > 1) history.pop();
    const preMode = history[history.length - 1];
    return setMode(preMode);
  };
  return {
    mode,
    transition,
    back,
  };
}
