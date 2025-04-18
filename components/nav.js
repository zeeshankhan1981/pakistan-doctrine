// Shared nav dropdown logic
// Handles mobile toggle and region dropdown usability

function initNavDropdown() {
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  if(navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
      navMenu.classList.toggle('hidden');
    });
  }
  // Region dropdown fix for desktop - improved
  const regionMenu = document.querySelector('li.group');
  const regionDropdown = document.getElementById('region-dropdown');
  if(regionMenu && regionDropdown) {
    let dropdownTimeout;
    // Mouse events
    regionMenu.addEventListener('mouseenter', function() {
      clearTimeout(dropdownTimeout);
      regionDropdown.classList.remove('hidden');
    });
    regionMenu.addEventListener('mouseleave', function() {
      dropdownTimeout = setTimeout(() => {
        regionDropdown.classList.add('hidden');
      }, 150);
    });
    regionDropdown.addEventListener('mouseenter', function() {
      clearTimeout(dropdownTimeout);
      regionDropdown.classList.remove('hidden');
    });
    regionDropdown.addEventListener('mouseleave', function() {
      dropdownTimeout = setTimeout(() => {
        regionDropdown.classList.add('hidden');
      }, 150);
    });
    // Keyboard accessibility
    const regionButton = regionMenu.querySelector('button');
    regionButton.setAttribute('aria-haspopup', 'true');
    regionButton.setAttribute('aria-expanded', 'false');
    regionButton.addEventListener('focus', function() {
      regionDropdown.classList.remove('hidden');
      regionButton.setAttribute('aria-expanded', 'true');
    });
    regionButton.addEventListener('blur', function() {
      setTimeout(() => {
        if (!regionDropdown.matches(':hover')) {
          regionDropdown.classList.add('hidden');
          regionButton.setAttribute('aria-expanded', 'false');
        }
      }, 150);
    });
    regionButton.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault();
        regionDropdown.classList.remove('hidden');
        regionButton.setAttribute('aria-expanded', 'true');
        regionDropdown.querySelector('a').focus();
      } else if (e.key === 'Escape') {
        regionDropdown.classList.add('hidden');
        regionButton.setAttribute('aria-expanded', 'false');
        regionButton.blur();
      }
    });
    // Allow tabbing through dropdown
    const dropdownLinks = regionDropdown.querySelectorAll('a');
    dropdownLinks.forEach((link, idx) => {
      link.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
          regionDropdown.classList.add('hidden');
          regionButton.setAttribute('aria-expanded', 'false');
          regionButton.focus();
        } else if (e.key === 'Tab' && idx === dropdownLinks.length - 1 && !e.shiftKey) {
          // If tabbing out of last link, close dropdown
          regionDropdown.classList.add('hidden');
          regionButton.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }
}

// If nav is present at page load (for dev), auto-init
if (document.getElementById('nav-menu')) {
  initNavDropdown();
}
// When loaded dynamically, call initNavDropdown() after injection
