import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./hero.css";
import back from "../../images/back.png";

function HeroDiv(data) {
  let naviga = useNavigate();
  const [trophyClass, setTrophy] = useState("H");
  const [rarityBackground, setBackground] = useState(
    "linear-gradient(180deg, rgba(45, 43, 150, 0) 0%, #211ead 54.56%)"
  );
  const infoHero = data.data;
  useEffect(() => {
    if (infoHero) {
      switch (infoHero.trophyClass) {
        case 2:
          setTrophy("G");
          break;
        case 3:
          setTrophy("F");
          break;
        case 4:
          setTrophy("E");
          break;
        case 5:
          setTrophy("D");
          break;
        case 6:
          setTrophy("C");
          break;
        case 7:
          setTrophy("B");
          break;
        case 8:
          setTrophy("A");
          break;
        case 9:
          setTrophy("S");
          break;
        case 10:
          setTrophy("SS");
          break;
        default:
          setTrophy("H");
      }
      //console.log(infoHero)
      switch (infoHero.heroRarity) {
        case 1:
          setBackground(
            "linear-gradient(180deg, rgba(74, 0, 169, 0) 0%, #4a00a9 57.56%)"
          );
          break;
        case 2:
          setBackground(
            "linear-gradient(180deg, rgba(255, 153, 0, 0) 0%, #bf5000 57.56%)"
          );
          break;
        default:
          setBackground(
            "linear-gradient(180deg, rgba(45, 43, 150, 0) 0%, #211ead 54.56%)"
          );
      }
    }
  }, []);

  const price = infoHero.price / 100000000;
  const priceUSD = (price * data.thcPrice).toFixed(2);

  function getHeroLink() {
    //console.log(infoHero);
    naviga(`/${infoHero.refId}`);
  }

  return (
    <div className="heroDiv" onClick={() => getHeroLink()}>
      <div className="polygonContainer">
        <div className="polygon"></div>
      </div>
      <div className="heroSpace">
        {infoHero && (
          <img src={"https://assets.thetanarena.com/" + infoHero.imageFull} />
        )}
        <div className="infoHero">
          <div style={{ background: rarityBackground }} className="nomeHero">
            <span>
              {" "}
              <h2>{infoHero.name}</h2> <h4>Livello {infoHero.level}</h4>
            </span>
            <span>
              {" "}
              <h4>{infoHero.skinName}</h4> <h3>classe {trophyClass}</h3>
            </span>
          </div>
          <div className="nomeHero">
            <span>
              {" "}
              <h4>Battaglie</h4>{" "}
              <h3>
                {infoHero.battleCapMax -
                  infoHero.battleCap +
                  "/" +
                  infoHero.battleCapMax +
                  "(" +
                  infoHero.battleCap +
                  ")"}
              </h3>
            </span>
            <span>
              {" "}
              <h4>prezzo</h4>
              <span>
                <h3 style={{ color: "#fbba15" }}>{price} THC</h3>
                <h5>${priceUSD} USD</h5>
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

const modalStyles = {
  content: {
    position: "absolute",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    zIndex: 99,
  },
};

function Market(props) {
  const [hero, setHero] = useState([]);
  const [open, setOpen] = useState("");
  const [urlRarity, setRarity] = useState(3);
  let naviga = useNavigate();
  const urlBase = "https://data.thetanarena.com/thetan/v1/nif/search?sort=";
  const chepestItem = urlBase + "PPB&batPercentMin=60&from=0&size=30";
  const starterPack =
    urlBase +
    "PPB&batPercentMin=20&levelMin=1&levelMax=2&trophyMax=2&trophyMin=1&batPercentMax=40&size=30";

  const [stateOfSearch, setSearch] = useState(0);

  useEffect(() => {
    cercaHero(chepestItem);
  }, []);

  function cercaHero(url, state, rarity) {
    console.log(urlRarity)
    if(urlRarity !== rarity && rarity !== undefined) {
      setRarity(rarity);
    }
    
    if (state !== undefined) {
      setSearch(state);
    }
    if (rarity !== 3 && rarity !== undefined) {
      url = url + "&heroRarity=" + rarity;
    }
    

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.page.total / 30);
        setHero(data.data);
      });
  }

  function openDiv() {
    if (open === "") {
      setOpen(" attivo");
    } else {
      setOpen("");
    }
  }

  function rarityButton(rarity) {
    //console.log(rarity);
    switch (stateOfSearch) {
      case 1:
        cercaHero(starterPack, undefined, rarity);
        break;
      default:
        cercaHero(chepestItem, undefined, rarity);
    }
  }
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Experimetal Market</h1>

      <div
        style={{ minWidth: 300, margin: "0 auto" }}
        className="mainLayout column flexSpace marginTop30 maxWidth350"
      >
        <div className="flexLayout">
          <button className="buttonOne" onClick={openDiv}>
            {open ? "Chiudi Filtri" : "Filtri"}
          </button>
          <div
            style={{ backgroundImage: "url(" + back + ")" }}
            className="back"
            onClick={() => naviga("/")}
          ></div>
        </div>
        <div className="flexLayout column">
          <div className={"containerDeiFiltri" + open}>
            
            <div className="">
            <h3 style={{textAlign: 'center'}}>Scegli la rarità dell'eroe</h3>
              <span className="flexLayout">
                <button
                  style={{
                    backgroundColor: urlRarity === 0 ? "#fbba16" : "#2290FF",
                  }}
                  onClick={() => rarityButton(0)}
                  className="buttonTre fullWidth"
                >
                  Comune
                </button>
                <button
                  style={{
                    backgroundColor: urlRarity === 1 ? "#fbba16" : "#2290FF",
                  }}
                  onClick={() => rarityButton(1)}
                  className="buttonTre fullWidth"
                >
                  Epico
                </button>
                <button
                  style={{
                    backgroundColor: urlRarity === 2 ? "#fbba16" : "#2290FF",
                  }}
                  onClick={() => rarityButton(2)}
                  className="buttonTre fullWidth"
                >
                  Leggendario
                </button>
                <button
                  style={{
                    backgroundColor: urlRarity === 3 ? "#fbba16" : "#2290FF",
                  }}
                  onClick={() => rarityButton(3)}
                  className="buttonTre fullWidth"
                >
                  Tutti
                </button>
              </span>
              <h3 style={{textAlign: 'center'}}>Scegli rapporto partite/prezzo</h3>
              <button
                style={{
                  backgroundColor: stateOfSearch === 1 ? "#fbba16" : "#2290FF",
                }}
                onClick={() => cercaHero(starterPack, 1, urlRarity)}
                className="buttonTwo fullWidth marginTop10"
              >
                StarterPack
              </button>
              <button
                style={{
                  backgroundColor: stateOfSearch === 0 ? "#fbba16" : "#2290FF",
                }}
                onClick={() => cercaHero(chepestItem, 0, urlRarity)}
                className="buttonTwo fullWidth marginTop10"
              >
                Miglior Prezzo X Battaglie
              </button>

            </div>
          </div>
        </div>
      </div>
      <div className="heroContainer">
        {hero.lenght !== 0 ?
          hero.map((data, index) => {
            return (
              <HeroDiv thcPrice={props.thcPrice} data={data} key={index} />
            );
          }) : "Mi spiace ma non è stato trovato nessun Eroe"}
      </div>
    </div>
  );
}

export default Market;
