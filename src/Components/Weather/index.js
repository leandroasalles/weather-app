import "./weather.css";

export default function Weather({ infos }) {
  return (
    <div className="weather">
      <span className="weather--date">{infos.date}</span>
      <p className="weather--city">{infos.city}</p>
      <div className="weather--temp">
        <p className="temp-number">{infos.temp}</p>
        <p className="temp-icon">°</p>
      </div>
      <p className="weather--detail">{infos.detail}</p>
      <div className="weather--min-max">
        <div className="weather--min">
          <p className="temp-down-icon">↓</p>
          <p>{infos.min}</p>
        </div>
        <div className="weather--min">
          <p className="temp-up-icon">↑</p>
          <p>{infos.max}</p>
        </div>
      </div>
    </div>
  );
}
