import { useState, useEffect } from "react";
import { DataMode } from "./App";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return { width, height };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}

export type ScrollTo = "auto" | "disable";

export function useSettings(defaults: {
  datamode: DataMode;
  scrollto: ScrollTo;
}) {
  const dataModeState = useState<DataMode>(defaults.datamode);
  const [dataMode, setDataMode] = dataModeState;

  const scrollToState = useState<ScrollTo>(defaults.scrollto);
  const [scrollTo, setScrollTo] = scrollToState;

  return {
    dataMode,
    setDataMode,
    dataModeState,
    scrollTo,
    setScrollTo,
    scrollToState,
  };
}

export type Settings = ReturnType<typeof useSettings>;
