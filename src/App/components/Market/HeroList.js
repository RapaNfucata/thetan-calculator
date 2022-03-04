import { useEffect, useState } from "react";

function HeroList(props) {
  const [heros, setHeros] = useState([]);
  useEffect(() => {
    fetch("https://data.thetanarena.com/thetan/v1/hero/feConfigs?configVer=-1")
      .then((response) => response.json())
      .then((data) => {
        const heroList = data.data.configs;
        const heroArray = Object.values(heroList);
        heroArray.pop();

        setHeros(heroArray);
      });
    //console.log(heros);
  }, []);

  return (
    <div className="heroContainer">
      <div className="flexLayout">
        <h2 style={{ margin: 0 }}>LISTA EROI</h2>
        <div
          style={{ backgroundImage: "url(" + props.back + ")" }}
          className="back"
          onClick={() => props.chiudiLista()}
        ></div>
      </div>
      <div className="flexLayout">
        <button
          onClick={() => props.clickHero(null)}
          className="buttonTwo fullWidth marginTop10"
        >
          Tutti
        </button>
      </div>
      {heros.length > 0
        ? heros.map((hero, index) => {
            let imageExist = true;
            return (
              <div
                className="heroFilterDiv"
                key={index}
                onClick={() => props.clickHero(index)}
              >
                <div>
                  <img
                    width="100%"
                    src={
                      "https://assets.thetanarena.com/" +
                      hero.imgSmallDefaultIcon
                    }
                  />
                  <div className="">
                    <h5 style={{ margin: 0 }}>{hero.name}</h5>
                  </div>
                </div>
              </div>
            );
          })
        : "Nessun eroe trovato"}
    </div>
  );
}

export default HeroList;
