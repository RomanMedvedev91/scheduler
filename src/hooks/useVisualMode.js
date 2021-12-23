import React, { useState, useEffect } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = function (secondMode, replace = false) {
    if (replace) {
      return setMode(secondMode);
    }
    setHistory([...history, secondMode]);
    console.log("history", history);
    return setMode(secondMode);
  };

  const back = function () {
    let copiedHistory = [...history];
    copiedHistory.pop(mode);
    setHistory(copiedHistory);

    if (history.length > 1) {
      const preMode = copiedHistory[copiedHistory.length - 1];
      setMode(preMode);
    }
  };
  // const back = function () {
  //   if (history.length > 1) {
  //     history.pop(); //can't mutate state directly
  //   }
  //   const preMode = history[history.length - 1];
  //   return setMode(preMode);
  // };

  return {
    mode,
    transition,
    back,
  };
}
