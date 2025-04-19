// Demo data for infographics

// === DYNAMIC DATA LOADING FOR INFOGRAPHICS ===

async function fetchJson(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error('Failed to fetch ' + path);
  return await res.json();
}

document.addEventListener('DOMContentLoaded', async function () {
  // === Utility: Render sources below a chart ===
  function renderSources(containerId, sources) {
    const el = document.getElementById(containerId);
    if (!el || !sources || !sources.length) return;
    const srcDiv = document.createElement('div');
    srcDiv.className = 'mt-3 text-sm text-gray-500 text-center';
    srcDiv.innerHTML =
      'Source' + (sources.length > 1 ? 's' : '') + ': ' +
      sources.map(src => `<a href="${src}" class="text-green-700 underline hover:text-green-500" target="_blank">${src.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}</a>`).join(', ');
    el.parentNode.appendChild(srcDiv);
  }

  // === Utility: Add share/download buttons below a chart ===
  function addShareDownloadButtons(containerId, chartInstance, chartTitle) {
    const el = document.getElementById(containerId);
    if (!el) return;
    const btnDiv = document.createElement('div');
    btnDiv.className = 'flex justify-center gap-4 mt-2';
    // Download button
    const dlBtn = document.createElement('button');
    dlBtn.className = 'px-3 py-1 rounded bg-green-700 text-white hover:bg-green-800 text-sm';
    dlBtn.innerText = 'Download PNG';
    dlBtn.onclick = () => {
      const link = document.createElement('a');
      link.download = chartTitle.replace(/\s+/g, '_').toLowerCase() + '.png';
      link.href = chartInstance.toBase64Image();
      link.click();
    };
    // Share button
    const shareBtn = document.createElement('button');
    shareBtn.className = 'px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 text-sm';
    shareBtn.innerText = 'Copy Share Link';
    shareBtn.onclick = () => {
      navigator.clipboard.writeText(window.location.href + '#' + containerId);
      shareBtn.innerText = 'Copied!';
      setTimeout(() => { shareBtn.innerText = 'Copy Share Link'; }, 1200);
    };
    btnDiv.appendChild(dlBtn);
    btnDiv.appendChild(shareBtn);
    el.parentNode.appendChild(btnDiv);
  }

  // === Enforced Disappearances Over Time ===
  try {
    const violations = await fetchJson('data/violations.json');
    const disappearancesData = [];
    const disappearancesLabels = [];
    let disappearancesSources = [
      'https://hrcp-web.org/hrcpweb/',
      'https://hrw.org/news/2023/02/15/balochistan-disappearances'
    ];
    if (violations.regions && violations.regions.balochistan) {
      const cases = violations.regions.balochistan.cases;
      const byYear = {};
      cases.forEach(e => {
        const y = new Date(e.date).getFullYear();
        byYear[y] = (byYear[y] || 0) + 1;
        if (e.sources) disappearancesSources = disappearancesSources.concat(e.sources);
      });
      Object.keys(byYear).sort().forEach(y => {
        disappearancesLabels.push(y);
        disappearancesData.push(byYear[y]);
      });
    }
    const disappearancesCtx = document.getElementById('disappearancesChart').getContext('2d');
    const disappearancesChart = new Chart(disappearancesCtx, {
      type: 'line',
      data: {
        labels: disappearancesLabels.length ? disappearancesLabels : ['2018','2019','2020','2021','2022','2023','2024'],
        datasets: [{
          label: 'Disappearances',
          data: disappearancesData.length ? disappearancesData : [1200, 1350, 1600, 1750, 2000, 2200, 2500],
          borderColor: '#059669',
          backgroundColor: 'rgba(16,185,129,0.1)',
          tension: 0.4,
          pointBackgroundColor: '#059669',
          pointRadius: 5
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false }, title: { display: false } },
        scales: {
          y: { beginAtZero: true, ticks: { color: '#374151', font: { family: 'serif' } } },
          x: { ticks: { color: '#374151', font: { family: 'serif' } } }
        }
      }
    });
    renderSources('disappearancesChart', Array.from(new Set(disappearancesSources)));
    addShareDownloadButtons('disappearancesChart', disappearancesChart, 'Enforced Disappearances Over Time');
  } catch (e) { console.error('Disappearances chart error:', e); }

  // === Brain Drain: Skilled Migration ===
  try {
    const migration = await fetchJson('data/migration.json');
    const migrationCtx = document.getElementById('migrationChart').getContext('2d');
    const migrationChart = new Chart(migrationCtx, {
      type: 'bar',
      data: {
        labels: migration.years,
        datasets: [{
          label: 'Skilled Workers Leaving',
          data: migration.skilled_migration,
          backgroundColor: '#10b981',
          borderRadius: 8
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false }, title: { display: false } },
        scales: {
          y: { beginAtZero: true, ticks: { color: '#374151', font: { family: 'serif' } } },
          x: { ticks: { color: '#374151', font: { family: 'serif' } } }
        }
      }
    });
    renderSources('migrationChart', migration.sources);
    addShareDownloadButtons('migrationChart', migrationChart, 'Brain Drain Skilled Migration');
  } catch (e) { console.error('Migration chart error:', e); }

  // === Terrorism & Fatalities ===
  try {
    const terrorism = await fetchJson('data/terrorism.json');
    if (!terrorism) {
      throw new Error('Terrorism data not found');
    }
    
    // Ensure all required properties exist
    const years = terrorism.years || [];
    const incidents = terrorism.incidents || [];
    const fatalities = terrorism.fatalities || [];
    const sources = terrorism.sources || [];
    
    const terrorismCanvas = document.getElementById('terrorismChart');
    if (!terrorismCanvas) {
      throw new Error('terrorismChart canvas not found');
    }
    
    const terrorismCtx = terrorismCanvas.getContext('2d');
    const terrorismChart = new Chart(terrorismCtx, {
      type: 'bar',
      data: {
        labels: years,
        datasets: [
          {
            label: 'Incidents',
            data: incidents,
            backgroundColor: '#059669',
            borderRadius: 6
          },
          {
            label: 'Fatalities',
            data: fatalities,
            backgroundColor: '#ef4444',
            borderRadius: 6
          }
        ]
      },
      options: {
        responsive: true,
        plugins: { 
          legend: { display: true }, 
          title: { display: false } 
        },
        scales: {
          y: { beginAtZero: true, ticks: { color: '#374151', font: { family: 'sans-serif' } } },
          x: { ticks: { color: '#374151', font: { family: 'sans-serif' } } }
        }
      }
    });
    renderSources('terrorismChart', sources);
    addShareDownloadButtons('terrorismChart', terrorismChart, 'Terrorism and Fatalities');
  } catch (e) {
    console.error('Terrorism chart error:', e);
    // Display fallback message in the chart area
    const errorContainer = document.getElementById('terrorismChart');
    if (errorContainer) {
      errorContainer.style.display = 'none';
      const errorMsg = document.createElement('div');
      errorMsg.className = 'p-4 bg-red-50 text-red-700 rounded-md text-center';
      errorMsg.innerHTML = 'Unable to load terrorism data. <button class="underline" onclick="location.reload()">Reload</button>';
      errorContainer.parentNode.appendChild(errorMsg);
    }
  }

  // === Protest Crackdowns & Arrests ===
  try {
    const protests = await fetchJson('data/protests.json');
    const protestsCtx = document.getElementById('protestsChart').getContext('2d');
    const protestsChart = new Chart(protestsCtx, {
      type: 'line',
      data: {
        labels: protests.years,
        datasets: [
          {
            label: 'Major Protests',
            data: protests.major_protests,
            borderColor: '#10b981',
            backgroundColor: 'rgba(16,185,129,0.08)',
            tension: 0.4,
            pointBackgroundColor: '#10b981',
            pointRadius: 5
          },
          {
            label: 'Arrests',
            data: protests.arrests,
            borderColor: '#f59e42',
            backgroundColor: 'rgba(245,158,66,0.08)',
            tension: 0.4,
            pointBackgroundColor: '#f59e42',
            pointRadius: 5
          }
        ]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: true }, title: { display: false } },
        scales: {
          y: { beginAtZero: true, ticks: { color: '#374151', font: { family: 'serif' } } },
          x: { ticks: { color: '#374151', font: { family: 'serif' } } }
        }
      }
    });
    renderSources('protestsChart', protests.sources);
    addShareDownloadButtons('protestsChart', protestsChart, 'Protest Crackdowns and Arrests');
  } catch (e) { console.error('Protests chart error:', e); }

  // === Media Censorship & Journalist Killings ===
  try {
    const media = await fetchJson('data/media.json');
    const mediaCtx = document.getElementById('mediaChart').getContext('2d');
    const mediaChart = new Chart(mediaCtx, {
      type: 'bar',
      data: {
        labels: media.years,
        datasets: [
          {
            label: 'Journalists Killed',
            data: media.journalists_killed,
            backgroundColor: '#ef4444',
            borderRadius: 6
          },
          {
            label: 'Censorship Cases',
            data: media.censorship_cases,
            backgroundColor: '#6366f1',
            borderRadius: 6
          }
        ]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: true }, title: { display: false } },
        scales: {
          y: { beginAtZero: true, ticks: { color: '#374151', font: { family: 'serif' } } },
          x: { ticks: { color: '#374151', font: { family: 'serif' } } }
        }
      }
    });
    renderSources('mediaChart', media.sources);
    addShareDownloadButtons('mediaChart', mediaChart, 'Media Censorship and Journalist Killings');
  } catch (e) { console.error('Media chart error:', e); }

  // === Arrests by Year ===
  try {
    const violations = await fetchJson('data/violations.json');
    const arrestsData = [];
    const arrestsLabels = [];
    let arrestsSources = [
      'https://hrcp-web.org/hrcpweb/',
      'https://amnesty.org/en/location/asia-and-the-pacific/south-asia/pakistan/'
    ];
    if (violations.regions) {
      const byYear = {};
      Object.values(violations.regions).forEach(region => {
        region.cases.forEach(e => {
          if (e.category && e.category.toLowerCase().includes('arrest')) {
            const y = new Date(e.date).getFullYear();
            byYear[y] = (byYear[y] || 0) + 1;
            if (e.sources) arrestsSources = arrestsSources.concat(e.sources);
          }
        });
      });
      Object.keys(byYear).sort().forEach(y => {
        arrestsLabels.push(y);
        arrestsData.push(byYear[y]);
      });
    }
    const arrestsCtx = document.getElementById('arrestsChart').getContext('2d');
    const arrestsChart = new Chart(arrestsCtx, {
      type: 'bar',
      data: {
        labels: arrestsLabels.length ? arrestsLabels : ['2018','2019','2020','2021','2022','2023','2024'],
        datasets: [{
          label: 'Arrests',
          data: arrestsData.length ? arrestsData : [0,0,0,0,0,0,0],
          backgroundColor: 'rgba(16, 185, 129, 0.7)',
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          title: { display: false }
        },
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
    renderSources('arrestsChart', Array.from(new Set(arrestsSources)));
    addShareDownloadButtons('arrestsChart', arrestsChart, 'Arrests by Year');
  } catch (e) {
    console.error('Failed to render arrests chart:', e);
  }
});
