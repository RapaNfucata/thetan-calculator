import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ics from "../../images/ics.png";
import Guadagni from "./Guadagni";
import InfoPersonaggio from "./InfoPersonaggio";
import NomePersonaggio from "./NomePersonaggio";
import back from '../../images/back.png';
import cart from '../../images/cart.png';

function Calcolatore(props) {
  const [urlHero, setUrl] = useState("");
  const [dataHero, setDataHero] = useState(undefined);
  const inputURL = useRef();
  const prezzoTHC = props.prezzoTHC;
  let params = useParams();
  let naviga = useNavigate();
  console.log(params.heroId);

  useEffect(() => {
    if(params.heroId) {
      getDataFromUrl();
    } else {
      const listener = (event) => {
        if (event.code === "Enter" || event.code === "NumpadEnter") {
          event.preventDefault();
          getDataFromUrl();
        }
      };
      document.addEventListener("keyup", listener);
      return () => {
        document.removeEventListener("keyup", listener);
      };
    }
  }, []);

  function isValidHttpUrl(string) {
    let url;
    try {
      url = new URL(string);
    } catch (_) {
      return false;
    }
    return url.protocol === "http:" || url.protocol === "https:";
  }

  function getDataFromUrl() {
    setDataHero(undefined);
    let validation;
    if(!params.heroID) {
      validation = isValidHttpUrl(inputURL.current.value)
    } else {
    }

    //console.log(params.heroId);
    if (
      validation ||
      inputURL.current.value === "" ||
      params.heroId !== undefined
    ) {
      if (inputURL.current.value !== "" || params.heroId !== undefined) {
        let heroID = inputURL.current.value.split("/").pop();
        if (params.heroId) {
          heroID = params.heroId;
        }
        const URL = "https://data.thetanarena.com/thetan/v1/hero?id=" + heroID;
        fetch(URL)
          .then((response) => response.json())
          .then((data) => {
            console.log(data.data);

            setDataHero(data.data);
            inputURL.current.blur();
            setUrl("");
          });
      }
    } else {
      alert("inserisci un URL valido");
    }
  }

  function resetUrl() {
    setUrl("");
    inputURL.current.focus();
  }
  function goToStore() {
    const url = "https://marketplace.thetanarena.com/item/" + params.heroId
    window.open(url, '_blank')
  }

  function writeURL(e) {
    setUrl(e.target.value);
  }

  return (
    <div>
      <div className="resultLabel">
        
          <div
            style={{ minWidth: 300}}
            className="mainLayout column flexSpace marginTop30 maxWidth350"
          >
            <div className="input" style={{ width: 250, maxWidth: "none", display: params.heroId ? 'none' : 'flex' }}>
              <input
                ref={inputURL}
                style={{
                  padding: "0 40px 0 15px",
                  fontSize: 16,
                  maxWidth: "none",
                }}
                type="text"
                id="urlHero"
                value={urlHero}
                onChange={(e) => writeURL(e)}
              />
              <div
                style={{ backgroundImage: "url(" + ics + ")" }}
                className="inputLabel ics"
                onClick={() => resetUrl()}
              ></div>
            </div>
            <div style={{ display: params.heroId ? 'none' : 'flex' }} className="label">
              <h3 style={{ textAlign: "center" }}>URL Personaggio</h3>
              <h3 style={{ textAlign: "center" }} id="buyType">
                {""}
              </h3>
            </div>
            {
              params.heroId ? <div className="flexEnd">
                <div style={{backgroundImage: "url("+cart+")", backgroundSize: '70%', marginRight: 20}} className="back" onClick={() => goToStore()}></div>
                <div style={{backgroundImage: "url("+back+")"}} className="back" onClick={() => naviga('/market')}></div>
              </div> : null
            }
          </div>
      </div>
      {dataHero !== undefined ? (
        <div className="calcolatore">
          <NomePersonaggio dataHero={dataHero} />
          <InfoPersonaggio
            coin={props.coin}
            dataHero={dataHero}
            prezzoTHC={prezzoTHC}
            action={() => alert("azione")}
          />
          
          <Guadagni
            coin={props.coin}
            prezzoTHC={prezzoTHC}
            dataHero={dataHero}
          />
        </div>
      ) : null}
      <div className="calcola">
        {!params.heroId && (
          <button onClick={() => getDataFromUrl()}>Calcola</button>
        )}
      </div>
    </div>
  );
}

export default Calcolatore;
