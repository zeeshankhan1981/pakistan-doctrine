document.addEventListener('DOMContentLoaded', function () {
  // Get region name from URL
  const url = new URL(window.location);
  const regionName = url.pathname.split('/').pop().replace('.html', '');
  
  // Fetch violations data
  fetch('../data/violations.json')
    .then(response => response.json())
    .then(data => {
      const regionData = data.regions[regionName];
      if (!regionData) {
        throw new Error(`Region data not found for ${regionName}`);
      }

      // Update page title and header
      document.title = `${regionData.name} - Pakistan Under Siege`;
      document.querySelector('h1').textContent = regionData.name;
      document.querySelector('.text-lg').textContent = `Total documented cases: ${regionData.total_cases}`;

      // Display recent incidents
      const casesContainer = document.getElementById('casesContainer');
      window.regionCases = regionData.cases;
      // (Rendering now handled by filter.js)

      // Display category breakdown
      const categoryBreakdown = document.getElementById('categoryBreakdown');
      const categoryCounts = {};
      
      regionData.cases.forEach(caseItem => {
        categoryCounts[caseItem.category] = (categoryCounts[caseItem.category] || 0) + 1;
      });

      const breakdownHtml = Object.entries(categoryCounts).map(([category, count]) => `
        <div class="bg-gray-800 p-4 rounded hover:bg-gray-700">
          <div class="flex justify-between items-center">
            <span class="text-green-400">${category}</span>
            <span class="text-gray-400">${count} cases</span>
          </div>
          <div class="mt-2 h-2 bg-gray-700 rounded-full">
            <div class="h-full bg-green-400 rounded-full" style="width: ${(count / regionData.total_cases) * 100}%"></div>
          </div>
        </div>
      `).join('');
      categoryBreakdown.innerHTML = breakdownHtml;

      // Display sources
      const sourcesContainer = document.getElementById('sourcesContainer');
      if (sourcesContainer) {
        const allSources = new Set(regionData.cases.flatMap(caseItem => caseItem.sources));
        const sourcesHtml = Array.from(allSources).map(source => `
          <div class="bg-gray-800 p-4 rounded hover:bg-gray-700">
            <a href="${source}" class="text-green-400 underline hover:text-green-300" target="_blank">${new URL(source).hostname}</a>
          </div>
        `).join('');
        sourcesContainer.innerHTML = sourcesHtml;
      }

      // === DYNAMIC TIMELINE POPULATION ===
      // Timeline section (chronological events for the region)
      const timelineContainer = document.getElementById('timelineContainer');
      if (timelineContainer && regionData.cases && regionData.cases.length > 0) {
        // Sort cases by date ascending
        const sortedCases = regionData.cases.slice().sort((a, b) => new Date(a.date) - new Date(b.date));
        const timelineHtml = sortedCases.map(event => `
          <div class="relative pl-12">
            <div class="absolute -left-3 top-0 h-full w-0.5 bg-green-600"></div>
            <div class="bg-green-600 w-3 h-3 rounded-full absolute -left-1.5 top-3"></div>
            <div class="flex items-start">
              <span class="text-green-700 font-semibold mr-4">${new Date(event.date).toLocaleDateString()}</span>
              <div>
                <h3 class="text-lg font-semibold text-gray-900 mb-1">${event.title}</h3>
                <p class="text-gray-700 mb-1">${event.summary}</p>
                <div class="text-sm text-gray-500">
                  Category: <span class="text-green-700">${event.category}</span>
                  ${event.sources && event.sources.length > 0 ? '<span class="ml-2">' + event.sources.map(src => `<a href="${src}" class="text-green-700 underline hover:text-green-500 ml-1" target="_blank">Source</a>`).join('') + '</span>' : ''}
                </div>
              </div>
            </div>
          </div>
        `).join('');
        timelineContainer.innerHTML = timelineHtml;
      }

    })
    .catch(error => {
      console.error('Error loading region data:', error);
      document.body.innerHTML = `<div class="text-center p-8 text-red-400">Error loading region data. Please try again later.</div>`;
    });
});
