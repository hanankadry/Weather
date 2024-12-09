if (location.pathname === '/') {
    search("alexandria");
    var searchWord = document.getElementById("search");
    searchWord.addEventListener("keyup", item => {
        search(item.target.value)
    });
};

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const directions = [
    {
        letter: "N",
        word: "North"
    },
    {
        letter: "NNE",
        word: "North Northeast"
    },
    {
        letter: "NE",
        word: "Northeast"
    },
    {
        letter: "ENE",
        word: "East Northeast"
    },
    {
        letter: "E",
        word: "East"
    },
    {
        letter: "ESE",
        word: "East Southeast"
    },
    {
        letter: "SE",
        word: "Southeast"
    },
    {
        letter: "SSE",
        word: "South Southeast"
    },
    {
        letter: "S",
        word: "South"
    },
    {
        letter: "SSW",
        word: "South Southwest"
    },
    {
        letter: "SW",
        word: "Southwest"
    },
    {
        letter: "WSW",
        word: "West Southwest"
    },
    {
        letter: "W",
        word: "West"
    },
    {
        letter: "WNW",
        word: "West Northwest"
    },
    {
        letter: "NW",
        word: "Northwest"
    },
    {
        letter: "NNW",
        word: "North Northwest"
    }
];

async function search(country) {
    let req = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=c4c6130c38e046d48b2233056240812&q=${country}&days=3`);
    if (req.ok && 400 != req.status) {
        let res = await req.json();
        displayCurrent(res.location, res.current, res.forecast.forecastday[0].day.daily_chance_of_rain);
        displayFuture(res.forecast.forecastday);
    }
}

function displayCurrent(location, current, rain) {
    let cartona = ``;
    if (current != null) {
        var direction = directions.filter(function (item) { return item.letter === current.wind_dir })[0].word || {};
        var date = new Date(current.last_updated.replace(" ", "T"));
        cartona += `
         <div class="col-lg-4">
            <div class="forecast-header today" id="today">
              <div class="day">${days[date.getDay()]}</div>
              <div class="date">${date.getDate() + " " + months[date.getMonth()]}</div>
            </div>
            <div class="forecast-body today" id="current">
              <div class="location">${location.name}</div>
              <div class="degree">
                <div class="number">${current.temp_c}<sup>o</sup>C</div>
                <div class="icon">
                  <img src="https:${current.condition.icon}" alt="${current.condition.text}" width="90" />
                </div>
              </div>
              <div class="weather-pred">${current.condition.text}</div>
              <span>
                <img
                  src="imgs/icon-umberella.png"
                  alt="rain"
                  width="21"
                  height="21"
                />
                ${rain}%
              </span>
              <span>
                <img
                  src="imgs/icon-wind.png"
                  alt="wind"
                  width="21"
                  height="21"
                />
                ${current.wind_kph}km/h
              </span>
              <span>
                <img
                  src="imgs/icon-compass.png"
                  alt="wind direction"
                  width="21"
                  height="21"
                />
                ${direction}
              </span>
            </div>
          </div>`;
        document.getElementById("forecast").innerHTML = cartona;
    }
}

function displayFuture(next) {
    let cartona = ``;
    for (let i = 1; i < next.length; i++) {
        cartona += `<div class="col-lg-4">
            <div
              class="forecast-header d-flex justify-content-center align-items-center"
            >
              <div class="day">${days[new Date(next[i].date.replace(" ", "T")).getDay()]}</div>
            </div>
            <div class="forecast-body">
              <div class="degree">
                <div class="icon">
                  <img src="https:${next[i].day.condition.icon}" alt="${next[i].day.condition.text}" width="48" />
                </div>
                <div class="number">
                  <div class="high">${next[i].day.maxtemp_c}<sup>o</sup>C</div>
                  <div class="low">${next[i].day.mintemp_c}<sup>o</sup></div>
                </div>
              </div>
              <div class="weather-pred">${next[i].day.condition.text}</div>
            </div>
          </div>`;
    }
    document.getElementById("forecast").innerHTML += cartona
}
