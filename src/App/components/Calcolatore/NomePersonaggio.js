function NomePersonaggio(props) {
  const hero = props.dataHero;
  let statoPersonaggio = "";

  if (hero) {
    //console.log(hero.status);
    switch (hero.status) {
      case 3:
        // se il personaggio è stato aquistato
        statoPersonaggio = "(Comprato)";
        break;
      case 10:
        // se il personaggio è sul mercato
        statoPersonaggio = "(Comprare)";
        break;
      case 11:
        // se il personaggio è in affitto
        statoPersonaggio = "(Affittare)";

      default:
        statoPersonaggio = "";
    }
    if (!hero.sale) {
      // se l'hai trovato in una box
      switch (hero.heroInfo.rarity) {
        case 0:
          statoPersonaggio = "(Box Comune)";
          break;
        case 1:
          statoPersonaggio = "(Box Epica)";
          break;
        default:
          statoPersonaggio = "(Box Leggendaria)";
      }
    }
  }

  return (
    <div className="mainLayout alignEnd flexCenter marginTop10 column">
      <div className="avatar">
        {hero ? (
          <img
            src={"https://assets.thetanarena.com/" + hero.skinInfo.imageFull}
            alt="avatar"
          />
        ) : null}
      </div>
      <h2 style={{ margin: 0 }}>{hero ? hero.heroInfo.name : "Personaggio"}</h2>
      {hero && <h4 style={{ margin: 0 }}>{hero.skinInfo.name}</h4>}
      {hero && <h5 style={{ margin: 0 }}>{statoPersonaggio}</h5>}
      <div id="calcolatore"></div>
    </div>
  );
}

export default NomePersonaggio;
