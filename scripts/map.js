// Interactive Map: Human Rights & Crisis Hotspots
// Uses Leaflet.js via CDN (add <link> and <script> in index.html if not present)

document.addEventListener('DOMContentLoaded', async function () {
  if (!document.getElementById('map')) return;

  // Initialize map
  const map = L.map('map').setView([30.3753, 69.3451], 5.2); // Center: Pakistan
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  // Load region data (demo: Balochistan, Sindh, Punjab, GB)
  const regions = [
    {
      name: 'Balochistan',
      coords: [29.8944, 67.0241],
      stats: 'Disappearances: 150+<br>Terror Incidents: 789 (2024)',
      link: 'regions/balochistan.html'
    },
    {
      name: 'Sindh',
      coords: [25.8943, 68.5247],
      stats: 'Disappearances: 80+<br>Protests: 55 (2024)',
      link: 'regions/sindh.html'
    },
    {
      name: 'Punjab',
      coords: [31.1704, 72.7097],
      stats: 'Disappearances: 60+<br>Arrests: 2100 (2024)',
      link: 'regions/punjab.html'
    },
    {
      name: 'Gilgit-Baltistan',
      coords: [35.8020, 74.9836],
      stats: 'Disappearances: 15+<br>Protests: 12 (2024)',
      link: 'regions/gb.html'
    }
  ];

  regions.forEach(region => {
    const marker = L.marker(region.coords).addTo(map);
    marker.bindPopup(
      `<b>${region.name}</b><br>${region.stats}<br><a href='${region.link}' class='text-green-700 underline' target='_blank'>Details</a>`
    );
  });
});
