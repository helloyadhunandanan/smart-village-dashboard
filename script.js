document.addEventListener("DOMContentLoaded", () => {
  const villages = [
    {
      name: "Model Village - Rampur",
      state: "Uttar Pradesh",
      category: ["Infrastructure", "Healthcare"],
      coordinates: [27.2, 79.0],
      population: "5,000",
      electrified: "Yes",
      school: "Yes",
      hospital: "Yes"
    },
    {
      name: "Green Village - Pali",
      state: "Rajasthan",
      category: ["Infrastructure", "Education"],
      coordinates: [25.8, 73.3],
      population: "3,800",
      electrified: "Yes",
      school: "Yes",
      hospital: "No"
    }
  ];

  const map = L.map('map').setView([23.5, 80], 5);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  const container = document.getElementById("villageList");

  villages.forEach(village => {
    const card = document.createElement("div");
    card.className = "village-card";
    const tags = village.category.map(cat => `<span class='tag ${cat.toLowerCase()}'>${cat}</span>`).join(" ");

    card.innerHTML = `
      <h3>${village.name}</h3>
      <p><strong>State:</strong> ${village.state}</p>
      <p><strong>Population:</strong> ${village.population}</p>
      <p><strong>Electricity:</strong> ${village.electrified}</p>
      <p><strong>School:</strong> ${village.school}</p>
      <p><strong>Hospital:</strong> ${village.hospital}</p>
      ${tags}
    `;

    container.appendChild(card);

    L.marker(village.coordinates)
      .addTo(map)
      .bindPopup(`<b>${village.name}</b><br>${village.state}`);
  });

  // Dark Mode Toggle
  document.getElementById("darkModeToggle").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
  });

  // Search Function
  document.getElementById("searchInput").addEventListener("input", (e) => {
    const val = e.target.value.toLowerCase();
    document.querySelectorAll(".village-card").forEach((card) => {
      card.style.display = card.innerText.toLowerCase().includes(val) ? "block" : "none";
    });
  });
});

// Category Filter
function filterCategory(type) {
  document.querySelectorAll(".village-card").forEach((card) => {
    if (type === "all") {
      card.style.display = "block";
    } else {
      const tags = Array.from(card.querySelectorAll(".tag"));
      const match = tags.some(tag => tag.textContent.toLowerCase() === type.toLowerCase());
      card.style.display = match ? "block" : "none";
    }
  });
}
