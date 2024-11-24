import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [time, setTime] = useState(new Date());
  const [is12HrFormat, setIs12HrFormat] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  // const [period, setPeriod] = useState('')
  useEffect(() => {
    let interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  let hours = time.getHours();
  const minutes = String(time.getMinutes()).padStart(2, "0");
  const seconds = String(time.getSeconds()).padStart(2, "0");
  let period = '';
  if (is12HrFormat) {
    period = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
  }

  const displayTime = `${String(hours).padStart(2, "0")}:${minutes}:${seconds}`;

  return (
    <div className={`App ${isDarkMode ? "dark" : "light"}`}>
      <div className="timeparent">
        <span className="time">{displayTime}</span>
        {is12HrFormat && <span className="time period">{period}</span>}
      </div>
      <div className="controls">
        <button className="icon-toggle" onClick={() => setIsDarkMode(!isDarkMode)}>
          {isDarkMode ? (
            <span role="img" aria-label="sun">
              🌞 Theme
            </span>
          ) : (
            <span role="img" aria-label="moon">
              🌙 Theme
            </span>
          )}
        </button>
        <button
          className="format-toggle"
          onClick={() => {
            setIs12HrFormat(!is12HrFormat);
          }}
        >
          {is12HrFormat ? "12hr" : "24hr"}
        </button>
      </div>
    </div>
  );
}

export default App;
