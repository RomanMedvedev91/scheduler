import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = function (secondMode, replace = false) {
    if (replace) {
      setMode(secondMode);
      return;
    }
    setHistory([...history, secondMode]);
    return setMode(secondMode);
  };

  const back = function () {
    if (history.length > 1) {
      let copiedHistory = [...history];
      copiedHistory.pop();
      const preMode = copiedHistory[copiedHistory.length - 1];
      setHistory(copiedHistory);
      setMode(preMode);
      return;
    }
    setMode(initial);
  };

  return {
    mode,
    transition,
    back,
  };
}
