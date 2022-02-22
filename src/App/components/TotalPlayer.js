function TotalPlayer(props) {
    const players = String(props.players).replace(/\B(?=(?:\d{3})+(?!\d))/g, ",");
  return (
    <div className="resultLabel">
      <h3>
        {players} players
      </h3>
    </div>
  );
}

export default TotalPlayer;
