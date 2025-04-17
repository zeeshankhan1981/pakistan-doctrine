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

      // Search functionality
      searchBox.addEventListener('input', function () {
        if (this.value.length < 3) {
          searchResults.innerHTML = '';
          return;
        }

        const results = idx.search(this.value);
        
        if (results.length === 0) {
          searchResults.innerHTML = '<p class="text-gray-400">No results found</p>';
          return;
        }

        const html = results.map(result => {
          const item = data.regions.find(region => 
            region.cases.some(c => c.id === result.ref)
          ).cases.find(c => c.id === result.ref);

          return `
            <div class="bg-gray-800 p-4 my-2 rounded hover:bg-gray-700">
              <h3 class="text-green-400">${item.title}</h3>
              <p class="text-gray-400">${item.summary}</p>
              <div class="mt-2">
                <span class="text-sm text-gray-400">Region: ${item.region}</span>
                <span class="text-sm text-gray-400 ml-4">Category: ${item.category}</span>
              </div>
              <div class="mt-2">
                ${item.sources.map(source => `
                  <a href="${source}" class="text-green-400 underline hover:text-green-300" target="_blank">Source</a>
                `).join('')}
              </div>
            </div>
          `;
        }).join('');

        searchResults.innerHTML = html;
      });
    })
    .catch(error => {
      console.error('Error loading violations data:', error);
      searchResults.innerHTML = '<p class="text-red-400">Error loading search data</p>';
    });
});
