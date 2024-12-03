import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [btcValue, setBtcValue] = useState(0);
  const [idrValue, setIdrValue] = useState(0);
  const [countdown, setCountdown] = useState(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let timer;

    if (isActive && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (isActive && countdown === 0) {
      setToriginalState();
    }

    return () => clearTimeout(timer); // Cleanup
  }, [countdown, isActive]);

  const startCountdown = () => {
    setCountdown(30);
    setIsActive(true);
  };

  const setToriginalState = () => {
    setIsActive(false);
    setIdrValue(0);
  };

  const convertButton = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/convert-btc/${btcValue}`
      );
      setIdrValue(response.data.data);
      startCountdown();
    } catch (e) {
      console.log("error ", e);
    }
  };

  const setBtcValueOnChange = (e) => {
    setBtcValue(e.target.value);
    setToriginalState();
  };

  return (
    <>
      <div style={{ fontWeight: "bold" }}>
        DISCLAIMER: Because Bitcoin is so volatile, the price only valid for the
        next 30 seconds. After that, you have to re-convert the price
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}
      >
        <div>
          <p>BTC</p>
          <input
            onChange={setBtcValueOnChange}
            style={{ width: "30%", height: "50%" }}
            placeholder="0"
          />
        </div>
        <button
          style={{
            cursor: "pointer",
            width: "70px",
            height: "70px",
            marginRight: "70px",
          }}
          onClick={convertButton}
          disabled={isActive}
        >
          {isActive ? `Valid for ${countdown}` : "Convert"}
        </button>
        <div>
          <p>IDR</p>
          <p>{idrValue}</p>
        </div>
      </div>
    </>
  );
}

export default App;
