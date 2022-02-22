import { useEffect, useState } from "react";
import "./App.css";
import Calcolatore from "./components/Calcolatore";
import DataThc from "./components/DataThc";
import Footer from "./components/Footer";
import TotalPlayer from "./components/TotalPlayer";

import coin from './images/coin.png';

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
    <div>
    <div className="mainContainer">
      <div className="mainLayout noStyle flexCenter column">
        <h1 style={{ textAlign: "center" }}>Thetan Hero Calculator</h1>
        <DataThc prezzo={thcPrice} coin={coin} />
        <TotalPlayer players={players} />
        
      </div>
<div style={{
  padding: "0 20px"
}}>
        <h5 style={{ textAlign: "center" }}>Vai sul <a rel="noreferrer" target="_blank" href="https://marketplace.thetanarena.com/">marketplace di Thetan Arena</a>, scegli un personaggio, copia il link e incollalo qui e poi premi enter oppure "calcola"</h5>

</div>

      <Calcolatore prezzoTHC={thcPrice} coin={coin} />
    </div>
      <Footer />
    </div>
  );
}

export default App;
