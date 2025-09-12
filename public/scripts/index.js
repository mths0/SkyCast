const cities = ["Riyadh", "London", "Paris", "Tokyo", "New York", "Cairo", "Dubai", "Moscow", "Berlin"];
  const input = document.getElementById("search");
  const list = document.getElementById("suggestions");

  // ✅ Rotate placeholder every 2s if empty
  let index = 0;
  setInterval(() => {
    if (input.value === "") {
      input.setAttribute("placeholder", cities[index]);
      index = (index + 1) % cities.length;
    }
  }, 2000);

  // ✅ Show dropdown suggestions while typing
  input.addEventListener("input", () => {
    const query = input.value.toLowerCase();
    list.innerHTML = "";

    if (query) {
      const matches = cities.filter(c => c.toLowerCase().includes(query));
      matches.forEach(city => {
        const li = document.createElement("li");
        li.textContent = city;
        li.style.cursor = "pointer";
        li.onclick = () => {
          input.value = city;  // set the chosen city
          list.innerHTML = ""; // clear suggestions
        };
        list.appendChild(li);
      });
    }
  });