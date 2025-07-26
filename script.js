const apiKey = "123abc456def789ghi000"; // sua chave real aqui


window.onload = () => {
  const cidadeFixada = localStorage.getItem("cidadeFixada");
  if (cidadeFixada) {
    document.getElementById("cityInput").value = cidadeFixada;
    buscarTempo(cidadeFixada);
  }
};

async function buscarTempo(cidade) {
  const city = cidade || document.getElementById("cityInput").value;

  if (!city) {
    alert("Digite uma cidade!");
    return;
  }

  try {
    const weatherRes = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=pt_br&units=metric`
    );
    const weatherData = await weatherRes.json();

    if (weatherData.cod !== 200) {
      document.getElementById("weatherInfo").innerHTML = "<p>Cidade não encontrada.</p>";
      return;
    }

    const imgURL = `https://source.unsplash.com/500x300/?${city}`;

    document.getElementById("weatherInfo").innerHTML = `
      <h2>${weatherData.name}, ${weatherData.sys.country}</h2>
      <p>🌡️ Temperatura: ${weatherData.main.temp}°C</p>
      <p>🌬️ Vento: ${weatherData.wind.speed} km/h</p>
      <p>☁️ Clima: ${weatherData.weather[0].description}</p>
      <img src="${imgURL}" alt="Imagem da cidade"/>
    `;
  } catch (error) {
    console.error(error);
    document.getElementById("weatherInfo").innerHTML = "<p>Erro ao buscar dados.</p>";
  }
}

function fixarCidade() {
  const city = document.getElementById("cityInput").value;
  if (city) {
    localStorage.setItem("cidadeFixada", city);
    alert("Cidade fixada!");
  }
}
