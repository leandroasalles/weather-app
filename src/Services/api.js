import axios from 'axios';

// Base da URL: https://api.openweathermap.org/data/2.5/
//URL DA API: weather?q=São Paulo,SP,BR&lang=pt_br&appid=da30632203859cc0451962ccfa4824cd

const api = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/'
});

export default api;