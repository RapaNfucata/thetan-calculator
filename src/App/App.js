import { useEffect, useState } from "react";
import "./App.css";
import Calcolatore from "./components/Calcolatore";
import DataThc from "./components/DataThc";
import Footer from "./components/Footer";
import Market from "./components/Market/Market";
import TotalPlayer from "./components/TotalPlayer";
import LoginWithMetamask from "./components/Wallet/LoginWithMetamask";

import { Routes, Route } from "react-router-dom";

import coin from "./images/coin.png";

function Calculator(props) {
  return (
    <div>
      <div className="mainContainer">
        <div className="mainLayout noStyle flexCenter column">
          <h1 style={{ textAlign: "center" }}>Thetan Hero Calculator</h1>
          <DataThc prezzo={props.thcPrice} coin={coin} />
          <TotalPlayer players={props.players} />
        </div>
        <div
          style={{
            padding: "0 20px",
          }}
        >
          <h5 style={{ textAlign: "center", margin: 0 }}>
            Vai sul{" "}
            <a
              rel="noreferrer"
              target="_blank"
              href="https://marketplace.thetanarena.com/"
            >
              marketplace di Thetan Arena
            </a>
            , scegli un personaggio, copia il link e incollalo qui e poi premi
            enter oppure "calcola"
          </h5>
        </div>

        <Calcolatore prezzoTHC={props.thcPrice} coin={coin} />
      </div>
      <Footer />
    </div>
  );
}

function App() {
  const [thcPrice, setPrice] = useState(0);
  const [players, setPlayers] = useState(0);
  useEffect(() => {
    // GET prezzo e players
    fetch("https://exchange.thetanarena.com/exchange/v1/currency/price/1")
      .then((response) => response.json())
      .then((data) => {
        setPrice(data.data);
      });
    fetch("https://data.thetanarena.com/thetan/v1/user/totalPlayers")
      .then((response) => response.json())
      .then((data) => {
        setPlayers(data.data);
      });
  }, []);
  return (
    <Routes>
      <Route index element={<Calculator thcPrice={thcPrice} players={players} />} />
      <Route path="market" element={<Market thcPrice={thcPrice} />} />
    </Routes>
  );
}

export default App;
