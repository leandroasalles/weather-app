import "./App.css";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useState } from "react";
import api from "./Services/api";

import Weather from "./Components/Weather";

function App() {
  const [city, setCity] = useState("");
  const [response, setResponse] = useState({});
  const [hide, setHide] = useState(true)

  async function searchCity() {

    if(city === ''){
      toast.error('Preencha a cidade!')
    }

    const docRef = `weather?q=${city}&lang=pt_br&appid=da30632203859cc0451962ccfa4824cd`;

    await api.get(docRef)

      .then((response) => {

        let date = new Date()
        let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
        let mounth = date.getMonth()+1 < 10 ? `0${date.getMonth()+1}` : date.getMonth()+1
        let year = date.getFullYear()
        let formatDate = `${day}/${mounth}/${year}`

        const tempKelvin = response.data.main.temp;
        const tempCelsius = (tempKelvin - 273.15).toFixed(0);

        const minKelvin = response.data.main.temp_min;
        const minCelsius = (minKelvin - 273.15).toFixed(0)

        const maxKelvin = response.data.main.temp_max;
        const maxCelsius = (maxKelvin - 273.15).toFixed(0)

        setResponse({
          city: response.data.name,
          temp: tempCelsius,
          detail: response.data.weather[0].description,
          date: formatDate,
          min: minCelsius,
          max: maxCelsius,
        });
        setCity("");
        setHide(false)

      })

      .catch((error) => {
        if (error.response.data.message === "city not found") {
          toast.error('cidade não localizada!')
          setCity("");
          setResponse("");
          setHide(true)
        }
      });
  }

  return (
    <div className="App">
      <ToastContainer autoClose={2000} pauseOnHover={false}/>
      <h1 className="app--title">Clima Tempo</h1>
      <div className="app--search">
        <input
          className="app--search-input"
          type="text"
          placeholder="Digite o nome da cidade..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button className="app--search-button" onClick={searchCity}>
          Pesquisar
        </button>
      </div>

      {!hide && <Weather infos={response} />}
    </div>
  );
}

export default App;
