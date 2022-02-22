function DataThc(props) {
    return (
        <div className="resultLabel">
          <div style={{backgroundImage: "url(" + props.coin + ")"}} className="thc"></div>
          <h3>1 THC = {props.prezzo} USD</h3>
        </div>
    )
}

export default DataThc