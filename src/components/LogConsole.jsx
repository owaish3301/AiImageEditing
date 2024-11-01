import { useEffect, useRef } from "react";

export default function LogConsole({ logs, isVisible }) {
  const consoleRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom whenever logs are updated
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [logs]);


  return (
    <div
      ref={consoleRef}
      className={`transition-all duration-300 overflow-y-scroll h-48 w-full p-4 bg-black text-white rounded mt-4 ${
        isVisible ? "block" : "hidden"
      }`}
      style={{ maxHeight: "200px" }}
    >
      {logs.map((log, index) => (
        <pre key={index} className="whitespace-pre-wrap text-sm">
          {log}
        </pre>
      ))}
    </div>
  );
}