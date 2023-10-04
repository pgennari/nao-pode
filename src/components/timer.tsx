"use client";
import React from "react";
import { useTimer } from "react-timer-hook";

export default function Timer({ expiryTimestamp }) {
  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp,
    onExpire: () => console.warn("onExpire called"),
    autoStart: false
  });

  // We will code the JSX later...
  return <>{String(seconds).padStart(2, "0")}</>;
}
