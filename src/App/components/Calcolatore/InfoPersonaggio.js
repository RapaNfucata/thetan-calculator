function InfoPersonaggio(props) {
  //console.log(props.dataHero);
  const hero = props.dataHero;

  let info = [];
  let costoHero = 0;
  let battaglieTotali = 0;
  let battaglieBruciate = 0;
  if (hero) {
    battaglieTotali = hero.heroRanking.totalBattleCapTHC;
    battaglieBruciate = hero.heroRanking.battleCapTHC;
    //console.log(hero.status);
    switch (hero.status) {
      case 3:
        // se il personaggio è stato aquistato
        if (hero.lastPrice) {
          // comprato dal market
          costoHero = hero.lastPrice.value / 100000000;
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
          costoHero = rarity;
        }
        break;
      case 10:
        // se il personaggio è sul mercato
        costoHero = hero.sale.price.value / 100000000;
        break;
      case 11:
        // se il personaggio è in affitto
        costoHero = hero.rentInfo.cost.value / 100000000;
        battaglieTotali = hero.rentInfo.rentBattles;
        battaglieBruciate = 0;
        break;

      default:
        costoHero = 0;
    }

    //console.log(costoHero)
    let battaglieRim = battaglieTotali - battaglieBruciate;

    info = [
      {
        value: costoHero,
        name: "Costo",
        usd: (costoHero * props.prezzoTHC).toFixed(2),
      },
      {
        value: battaglieTotali,
        name: "Battagle Totali",
      },
      {
        value: battaglieBruciate,
        name: "Battaglie Bruciate",
      },
      {
        value: battaglieRim,
        name: "Battaglie Rimanenti",
      },
      {
        value: (costoHero / (6 + hero.thcBonus)).toFixed(0),
        percentage: (((costoHero / (6 + hero.thcBonus)).toFixed(0) * 100) / battaglieRim).toFixed(0),
        name: "Vittorie Necessarie per recuperare l'investimento",
      },
      {
        value: hero.dailyTHCBattleConfig,
        name: "Daily Battles",
      },
      {
        value: hero.thcBonus,
        name: "Bonus THC",
        usd: (hero.thcBonus * props.prezzoTHC).toFixed(2),
      },
      {
        value: 6,
        name: "THC per vittoria",
        usd: (6 * props.prezzoTHC).toFixed(2),
      }
    ];
  }
  return (
    <div>
      {hero ? (
        info.map((data, index) => {
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
                  <h3 id="profittoPotenziale">
                    {data.value} {data.usd && " THC"} {data.percentage && <span style={{color: data.percentage < 50 ? "#0dc900" : "#d80000"}}>{' (' + data.percentage + '%)'}</span>}
                  </h3>
                  {data.usd && (
                    <div className="usd" id="profittoPotenzialeUSD">
                      {data.usd} USD
                    </div>
                  )}
                </div>
                {data.usd && (
                  <div
                    style={{ backgroundImage: "url(" + props.coin + ")" }}
                    className="thc"
                  ></div>
                )}
              </div>
            </div>
          );
        })
      ) : (
        <div>"NIENTE"</div>
      )}
    </div>
  );
}

export default InfoPersonaggio;
