import { useEffect, useState } from "react";

function Guadagni(props) {
  //console.log(props.dataHero);
  const hero = props.dataHero;
  let percentage = 1;

  const [colore1, setColore1] = useState();
  const [colore2, setColore2] = useState();
  const [colore3, setColore3] = useState();
  const [colore4, setColore4] = useState();
  const activeColor = "#2290FF";
  const standardColor = "#fbba16";

  function roundNumber(num) {
    const rndnum = Math.round((num + Number.EPSILON) * 100) / 100;
    return rndnum;
  }

  const [heroInfo, setHeroInfo] = useState([]);

  function percentageVar(perc) {
    switch (perc) {
      case 25:
        percentage = 0.25;
        setColore1(activeColor);
        setColore2(standardColor);
        setColore3(standardColor);
        setColore4(standardColor);
        setHero();
        break;
      case 50:
        percentage = 0.5;
        setColore1(standardColor);
        setColore2(activeColor);
        setColore3(standardColor);
        setColore4(standardColor);
        setHero();
        break;
      case 75:
        percentage = 0.75;
        setColore1(standardColor);
        setColore2(standardColor);
        setColore3(activeColor);
        setColore4(standardColor);
        setHero();
        break;
      default:
        percentage = 1;
        setColore1(standardColor);
        setColore2(standardColor);
        setColore3(standardColor);
        setColore4(activeColor);
        setHero();
    }
  }

  useEffect(() => {
    percentageVar();
  }, []);

  function setHero() {
    let battaglieRimanenti = 0;
    let prezzoHero = 0;

    switch (hero.status) {
      case 3:
        // se il personaggio è stato aquistato
        if (hero.lastPrice) {
          // comprato dal market
          prezzoHero = hero.lastPrice.value / 100000000;
        } else {
          // trovato nella box
          let rarity = 1000;
          switch (hero.heroInfo.rarity) {
            case 0:
              rarity = 1000;
              break;
            case 1:
              rarity = 2200;
              break;
            // la box leggendaria non può essere calcolata perché il prezzo è variabile
            default:
              rarity = 0;
          }
          prezzoHero = rarity;
        }
        battaglieRimanenti =
            hero.heroRanking.totalBattleCapTHC - hero.heroRanking.battleCapTHC;
        break;
      case 10:
        // se il personaggio è sul mercato
        prezzoHero = hero.sale.price.value / 100000000;
        battaglieRimanenti =
            hero.heroRanking.totalBattleCapTHC - hero.heroRanking.battleCapTHC;
        break;
      case 11:
        // se il personaggio è in affitto
        prezzoHero = hero.rentInfo.cost.value / 100000000;
        battaglieRimanenti = hero.rentInfo.rentBattles;
        break;

      default:
        prezzoHero = 0;
    }

    const battaglieRimanentiCalcolo = battaglieRimanenti * percentage;
    const battagliePerse = battaglieRimanenti - battaglieRimanentiCalcolo;


    //console.log(prezzoHero);
    const guadagnoPotenziale = roundNumber(
      (hero.thcBonus + 6) * battaglieRimanentiCalcolo + battagliePerse
    );
    
    const profittoPotenziale = roundNumber(
      (guadagnoPotenziale - prezzoHero)
    );
    const daily = roundNumber(
      (hero.thcBonus + 6) * (hero.dailyTHCBattleConfig * percentage)
    );

    const guadagnoUSD = (guadagnoPotenziale * props.prezzoTHC).toFixed(2);
    const profittoUSD = (profittoPotenziale * props.prezzoTHC).toFixed(2);
    const dailyUSD = (daily * props.prezzoTHC).toFixed(2);

    setHeroInfo([
      {
        value: daily,
        name: "THC al giorno",
        usd: dailyUSD,
      },
      {
        value: guadagnoPotenziale,
        name: "Guadagno",
        usd: guadagnoUSD,
      },
      {
        value: profittoPotenziale,
        name: "Profitto",
        usd: profittoUSD,
      },
    ]);
  }

  return (
    <div>
      <div className="mainLayout flexSpace marginTop10 maxWidth350 column">
        <h3>Percentuale Vittorie</h3>
        <div style={{ display: "flex" }} className="flexSpace">
          <button
            style={{ backgroundColor: colore1 }}
            className="buttonOne "
            onClick={() => percentageVar(25)}
          >
            25%
          </button>
          <button
            style={{ backgroundColor: colore2 }}
            className="buttonOne "
            onClick={() => percentageVar(50)}
          >
            50%
          </button>
          <button
            style={{ backgroundColor: colore3 }}
            className="buttonOne "
            onClick={() => percentageVar(75)}
          >
            75%
          </button>
          <button
            style={{ backgroundColor: colore4 }}
            className="buttonOne "
            onClick={() => percentageVar()}
          >
            100%
          </button>
        </div>
      </div>
      <div>
        {heroInfo ? (
          heroInfo.map((data, index) => {
            //console.log(data);
            return (
              <div
                key={index}
                className="mainLayout flexSpace marginTop10 maxWidth350"
              >
                <div>
                  <h3>{data.name}</h3>
                </div>
                <div className="resultLabel">
                  <div className="guadagnoLabel">
                    <h3 id="profittoPotenziale">{data.value} THC</h3>
                    <div className="usd" id="profittoPotenzialeUSD">
                      {data.usd} USD
                    </div>
                  </div>
                  <div
                    style={{ backgroundImage: "url(" + props.coin + ")" }}
                    className="thc"
                  ></div>
                </div>
              </div>
            );
          })
        ) : (
          <div>"NIENTE"</div>
        )}
      </div>
    </div>
  );
}

export default Guadagni;
