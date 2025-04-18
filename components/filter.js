// Modern, accessible filtering/search and timeline for region pages
// To be imported after region.js

document.addEventListener('DOMContentLoaded', function () {
  const casesContainer = document.getElementById('casesContainer');
  if (!casesContainer || !window.regionCases) return;
  const cases = window.regionCases;

  // --- Build Filter UI ---
  const filterSection = document.createElement('section');
  filterSection.className = 'mb-10';
  filterSection.innerHTML = `
    <form id="filterForm" class="flex flex-wrap gap-4 items-end bg-green-50 p-4 rounded-lg shadow">
      <div>
        <label for="yearFilter" class="block text-sm font-semibold text-green-700 mb-1">Year</label>
        <select id="yearFilter" name="year" class="form-select rounded border-gray-300 focus:border-green-500 focus:ring-green-500" multiple aria-label="Filter by year"></select>
      </div>
      <div>
        <label for="categoryFilter" class="block text-sm font-semibold text-green-700 mb-1">Category</label>
        <select id="categoryFilter" name="category" class="form-select rounded border-gray-300 focus:border-green-500 focus:ring-green-500" multiple aria-label="Filter by category"></select>
      </div>
      <div class="flex-1 min-w-[180px]">
        <label for="keywordFilter" class="block text-sm font-semibold text-green-700 mb-1">Keyword</label>
        <input id="keywordFilter" name="keyword" type="search" placeholder="Search..." class="form-input rounded border-gray-300 focus:border-green-500 focus:ring-green-500 w-full" aria-label="Search by keyword">
      </div>
      <button type="button" id="resetFilters" class="ml-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400">Reset</button>
    </form>
  `;
  casesContainer.parentNode.insertBefore(filterSection, casesContainer);

  // --- Populate Filter Options ---
  const years = Array.from(new Set(cases.map(c => new Date(c.date).getFullYear()))).sort((a,b)=>b-a);
  const categories = Array.from(new Set(cases.map(c => c.category))).sort();
  const yearFilter = document.getElementById('yearFilter');
  const categoryFilter = document.getElementById('categoryFilter');

  years.forEach(y => {
    const opt = document.createElement('option');
    opt.value = y;
    opt.textContent = y;
    yearFilter.appendChild(opt);
  });
  categories.forEach(cat => {
    const opt = document.createElement('option');
    opt.value = cat;
    opt.textContent = cat;
    categoryFilter.appendChild(opt);
  });

  // --- Filtering Logic ---
  function filterCases() {
    const selectedYears = Array.from(yearFilter.selectedOptions).map(o=>parseInt(o.value));
    const selectedCategories = Array.from(categoryFilter.selectedOptions).map(o=>o.value);
    const keyword = document.getElementById('keywordFilter').value.trim().toLowerCase();
    return cases.filter(c => {
      const yearMatch = !selectedYears.length || selectedYears.includes(new Date(c.date).getFullYear());
      const catMatch = !selectedCategories.length || selectedCategories.includes(c.category);
      const keywordMatch = !keyword || (c.title + ' ' + c.summary).toLowerCase().includes(keyword);
      return yearMatch && catMatch && keywordMatch;
    });
  }

  function renderCases(filtered) {
    casesContainer.innerHTML = filtered.length ? filtered.map(caseItem => `
      <div class="bg-gray-800 p-4 rounded hover:bg-gray-700">
        <h3 class="text-green-400 mb-2">${caseItem.title}</h3>
        <p class="text-gray-400 mb-2">${caseItem.summary}</p>
        <div class="text-sm text-gray-400">
          <span>Date: ${new Date(caseItem.date).toLocaleDateString()}</span>
          <span class="ml-4">Category: ${caseItem.category}</span>
        </div>
        <div class="mt-2">
          ${caseItem.sources.map(source => `
            <a href="${source}" class="text-green-400 underline hover:text-green-300" target="_blank">Source</a>
          `).join('')}
        </div>
      </div>
    `).join('') : '<div class="text-gray-500 text-lg">No incidents match your filters.</div>';
  }

  function update() {
    renderCases(filterCases());
  }

  document.getElementById('filterForm').addEventListener('input', update);
  document.getElementById('resetFilters').addEventListener('click', function() {
    yearFilter.selectedIndex = -1;
    categoryFilter.selectedIndex = -1;
    document.getElementById('keywordFilter').value = '';
    update();
  });

  update();

  // --- Timeline Visualization ---
  const timelineSection = document.createElement('section');
  timelineSection.className = 'mb-10';
  timelineSection.innerHTML = `
    <h2 class="text-2xl font-bold text-green-700 mb-4">Timeline of Incidents</h2>
    <div id="timeline" class="flex flex-col gap-4"></div>
  `;
  casesContainer.parentNode.insertBefore(timelineSection, filterSection.nextSibling);

  function renderTimeline() {
    const timeline = document.getElementById('timeline');
    const byYear = {};
    cases.forEach(c => {
      const y = new Date(c.date).getFullYear();
      if (!byYear[y]) byYear[y] = [];
      byYear[y].push(c);
    });
    const yearsSorted = Object.keys(byYear).sort((a,b)=>b-a);
    timeline.innerHTML = yearsSorted.map(y => `
      <div tabindex="0" aria-label="${y} incidents" class="bg-green-50 border-l-4 border-green-600 pl-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400">
        <div class="text-lg font-semibold text-green-700 mb-1">${y}</div>
        <div class="flex flex-wrap gap-2">
          ${byYear[y].map(c => `<span class="inline-block bg-green-200 text-green-900 px-2 py-1 rounded text-sm" title="${c.title}">${c.title}</span>`).join('')}
        </div>
      </div>
    `).join('');
  }
  renderTimeline();
});
