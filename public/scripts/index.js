const input = document.getElementById("search");
const list = document.getElementById("suggestions");
const wrapper = document.querySelector(".search-wrapper");

window.addEventListener("DOMContentLoaded", () => {
  const icon = document.body.dataset.icon;
  const body = document.body;

  if (backgroundThemes[icon]) {
    body.style.background = backgroundThemes[icon];
  } else {
    body.style.background = "linear-gradient(to bottom, #87ceeb, #f0f9ff)";
  }
});

//changing search suggests
let idx = 0;
setInterval(() => {
  if (!input.value) input.placeholder = cities[idx++ % cities.length];
}, 2000);

input.addEventListener("input", () => {
  const q = input.value.trim().toLowerCase();
  list.innerHTML = "";
  if (!q) {
    list.classList.remove("show");
    return;
  }

  const matches = cities.filter((c) => c.toLowerCase().includes(q));
  matches.forEach((city) => {
    const li = document.createElement("li");
    li.textContent = city;
    li.onclick = () => {
      input.value = city;
      list.innerHTML = "";
      list.classList.remove("show");
      input.form.submit();
    };
    list.appendChild(li);
  });

  if (matches.length) list.classList.add("show");
  else list.classList.remove("show");
});

// hide when clicking outside
document.addEventListener("click", (e) => {
  if (!wrapper.contains(e.target)) {
    list.innerHTML = "";
    list.classList.remove("show");
  }
});

const backgroundThemes = {
  "01d": "linear-gradient(to bottom, #f9d423, #ff4e50)", // clear day
  "01n": "linear-gradient(to bottom, #0f2027, #203a43, #2c5364)", // clear night

  "02d": "linear-gradient(to bottom, #fbc2eb, #a6c1ee)", // few clouds day
  "02n": "linear-gradient(to bottom, #2c3e50, #4ca1af)", // few clouds night

  "03d": "linear-gradient(to bottom, #bdc3c7, #2c3e50)", // scattered clouds
  "03n": "linear-gradient(to bottom, #2c3e50, #4b79a1)",

  "04d": "linear-gradient(to bottom, #757f9a, #d7dde8)", // broken clouds
  "04n": "linear-gradient(to bottom, #232526, #414345)",

  "09d": "linear-gradient(to bottom, #667db6, #0082c8, #0082c8, #667db6)",
  "09n": "linear-gradient(to bottom, #2c3e50, #3498db)",
  "10d": "linear-gradient(to bottom, #3a6073, #16222a)",
  "10n": "linear-gradient(to bottom, #141e30, #243b55)",

  // ⛈️ Thunderstorm
  "11d": "linear-gradient(to bottom, #180078ff, #b4bbd4ff)",
  "11n": "linear-gradient(to bottom, #232526, #414345)",

  // ❄️ Snow
  "13d": "linear-gradient(to bottom, #e0eafc, #cfdef3)",
  "13n": "linear-gradient(to bottom, #373b44, #4286f4)",

  // 🌫️ Mist
  "50d": "linear-gradient(to bottom, #bdc3c7, #2c3e50)",
  "50n": "linear-gradient(to bottom, #434343, #000000)",
};

const cities = [
  "Riyadh",
  "Cairo",
  "New York",
  "London",
  "Paris",
  "Tokyo",
  "Beijing",
  "Moscow",
  "Berlin",
  "Madrid",
  "Rome",
  "Istanbul",
  "Dubai",
  "Mumbai",
  "Sydney",
  "Toronto",
  "Los Angeles",
  "Mexico City",
  "Buenos Aires",
  "Cape Town",
  "Nairobi",
  "Seoul",
  "Jakarta",
  "Bangkok",
  "Tabuk",
  "AlNamas",
  "Khamis mushait",
];
