// Import Lunr.js
import lunr from 'https://cdn.jsdelivr.net/npm/lunr@2.3.9/lunr.min.js';

// Initialize search index
document.addEventListener('DOMContentLoaded', function () {
  const searchBox = document.getElementById('searchBox');
  const searchResults = document.getElementById('searchResults');
  
  if (!searchBox || !searchResults) return;

  // Fetch violations data
  fetch('/data/violations.json')
    .then(response => response.json())
    .then(data => {
      // Create Lunr index
      const idx = lunr(function () {
        this.ref('id');
        this.field('title', { boost: 10 });
        this.field('summary', { boost: 5 });
        this.field('category');
        this.field('region');
        this.field('sources');
        
        // Add all cases to index
        Object.values(data.regions).forEach(region => {
          region.cases.forEach(caseItem => {
            this.add({
              id: caseItem.id,
              title: caseItem.title,
              summary: caseItem.summary,
              category: caseItem.category,
              region: region.name,
              sources: caseItem.sources.join(', ')
            });
          });
        });
      });

      // Populate filter dropdowns
      const filterRegion = document.getElementById('filterRegion');
      const filterYear = document.getElementById('filterYear');
      const filterCategory = document.getElementById('filterCategory');
      const filterSource = document.getElementById('filterSource');

      // Gather unique filter values
      const allRegions = Object.values(data.regions).map(region => region.name);
      const allYears = Array.from(new Set(Object.values(data.regions).flatMap(region => region.cases.map(c => new Date(c.date).getFullYear())))).sort();
      const allCategories = Array.from(new Set(Object.values(data.regions).flatMap(region => region.cases.map(c => c.category)))).sort();
      const allSources = Array.from(new Set(Object.values(data.regions).flatMap(region => region.cases.flatMap(c => c.sources)))).sort();

      allRegions.forEach(region => {
        const opt = document.createElement('option');
        opt.value = region;
        opt.textContent = region;
        filterRegion.appendChild(opt);
      });
      allYears.forEach(year => {
        const opt = document.createElement('option');
        opt.value = year;
        opt.textContent = year;
        filterYear.appendChild(opt);
      });
      allCategories.forEach(cat => {
        const opt = document.createElement('option');
        opt.value = cat;
        opt.textContent = cat;
        filterCategory.appendChild(opt);
      });
      allSources.forEach(src => {
        const opt = document.createElement('option');
        opt.value = src;
        opt.textContent = src.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
        filterSource.appendChild(opt);
      });

      // Helper to get filter values
      function getFilters() {
        return {
          region: filterRegion.value,
          year: filterYear.value,
          category: filterCategory.value,
          source: filterSource.value
        };
      }

      // Unified search/filter handler
      function updateResults() {
        const query = searchBox.value;
        let results = query.length >= 3 ? idx.search(query) : [];
        // Map to item objects
        results = results.map(result => {
          const regionObj = Object.values(data.regions).find(region =>
            region.cases.some(c => c.id === result.ref)
          );
          const item = regionObj.cases.find(c => c.id === result.ref);
          item.region = regionObj.name;
          return item;
        });

        // Apply filters
        const filters = getFilters();
        results = results.filter(item => {
          if (filters.region && item.region !== filters.region) return false;
          if (filters.year && new Date(item.date).getFullYear().toString() !== filters.year) return false;
          if (filters.category && item.category !== filters.category) return false;
          if (filters.source && !(item.sources || []).includes(filters.source)) return false;
          return true;
        });

        if (results.length === 0) {
          searchResults.innerHTML = '<p class="text-gray-400">No results found</p>';
          return;
        }
        const html = results.map(item => `
          <div class="bg-gray-800 p-4 my-2 rounded hover:bg-gray-700">
            <h3 class="text-green-400">${item.title}</h3>
            <p class="text-gray-400">${item.summary}</p>
            <div class="mt-2">
              <span class="text-sm text-gray-400">Region: ${item.region}</span>
              <span class="text-sm text-gray-400 ml-4">Category: ${item.category}</span>
              <span class="text-sm text-gray-400 ml-4">Year: ${new Date(item.date).getFullYear()}</span>
            </div>
            <div class="mt-2">
              ${(item.sources || []).map(source => `
                <a href="${source}" class="text-green-400 underline hover:text-green-300" target="_blank">Source</a>
              `).join('')}
            </div>
          </div>
        `).join('');
        searchResults.innerHTML = html;
      }

      // Event listeners for search and filters
      searchBox.addEventListener('input', updateResults);
      filterRegion.addEventListener('change', updateResults);
      filterYear.addEventListener('change', updateResults);
      filterCategory.addEventListener('change', updateResults);
      filterSource.addEventListener('change', updateResults);

      // Optionally, trigger initial population
      updateResults();
    })
    .catch(error => {
      console.error('Error loading violations data:', error);
      searchResults.innerHTML = '<p class="text-red-400">Error loading search data</p>';
    });
});
