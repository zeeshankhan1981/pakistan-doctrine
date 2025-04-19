// Enhanced nav dropdown logic for modern navbar design
// Handles mobile toggle, region dropdowns, and accessibility

function initNavDropdown() {
  // Mobile menu toggle
  const navToggle = document.getElementById('nav-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', function() {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !expanded);
      mobileMenu.classList.toggle('hidden');
      
      // Change icon from hamburger to X when open (optional enhancement)
      const icon = navToggle.querySelector('svg');
      if (icon) {
        if (expanded) {
          icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />';
        } else {
          icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />';
        }
      }
    });
  }

  // Mobile regions dropdown
  const mobileRegionsButton = document.getElementById('mobile-regions-button');
  const mobileRegionsDropdown = document.querySelector('.mobile-regions-dropdown');
  const mobileMenuArrow = document.querySelector('.mobile-menu-arrow');
  
  if (mobileRegionsButton && mobileRegionsDropdown) {
    mobileRegionsButton.addEventListener('click', function() {
      const expanded = mobileRegionsButton.getAttribute('aria-expanded') === 'true';
      mobileRegionsButton.setAttribute('aria-expanded', !expanded);
      mobileRegionsDropdown.classList.toggle('hidden');
      
      // Rotate arrow
      if (mobileMenuArrow) {
        mobileMenuArrow.classList.toggle('rotate-180');
      }
    });
  }

  // Desktop regions dropdown
  const regionMenu = document.querySelector('li.group');
  const regionDropdown = document.querySelector('.group > div > ul');
  
  if (regionMenu && regionDropdown) {
    let dropdownTimeout;
    const regionButton = regionMenu.querySelector('button');
    
    // Set initial ARIA attributes
    if (regionButton) {
      regionButton.setAttribute('aria-haspopup', 'true');
      regionButton.setAttribute('aria-expanded', 'false');
    }
    
    // Mouse events with improved UX
    regionMenu.addEventListener('mouseenter', function() {
      clearTimeout(dropdownTimeout);
      if (regionButton) {
        regionButton.setAttribute('aria-expanded', 'true');
      }
      // Don't need to remove 'hidden' class as we're using CSS display logic
    });
    
    regionMenu.addEventListener('mouseleave', function() {
      dropdownTimeout = setTimeout(() => {
        if (regionButton) {
          regionButton.setAttribute('aria-expanded', 'false');
        }
      }, 150);
    });
    
    // Keyboard accessibility
    if (regionButton) {
      regionButton.addEventListener('focus', function() {
        regionButton.setAttribute('aria-expanded', 'true');
      });
      
      regionButton.addEventListener('blur', function() {
        setTimeout(() => {
          if (!regionDropdown.matches(':hover')) {
            regionButton.setAttribute('aria-expanded', 'false');
          }
        }, 150);
      });
      
      regionButton.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
          e.preventDefault();
          regionButton.setAttribute('aria-expanded', 'true');
          const firstLink = regionDropdown.querySelector('a');
          if (firstLink) {
            firstLink.focus();
          }
        } else if (e.key === 'Escape') {
          regionButton.setAttribute('aria-expanded', 'false');
          regionButton.blur();
        }
      });
    }
    
    // Improved keyboard navigation through dropdown items
    const dropdownLinks = regionDropdown.querySelectorAll('a');
    dropdownLinks.forEach((link, idx) => {
      link.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
          if (regionButton) {
            regionButton.setAttribute('aria-expanded', 'false');
            regionButton.focus();
          }
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          if (idx < dropdownLinks.length - 1) {
            dropdownLinks[idx + 1].focus();
          }
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          if (idx > 0) {
            dropdownLinks[idx - 1].focus();
          } else if (regionButton) {
            regionButton.focus();
          }
        } else if (e.key === 'Tab' && idx === dropdownLinks.length - 1 && !e.shiftKey) {
          // If tabbing out of last link, close dropdown
          if (regionButton) {
            regionButton.setAttribute('aria-expanded', 'false');
          }
        }
      });
    });
  }
}

// Initialize immediately if the navigation is present
if (document.getElementById('nav-toggle')) {
  initNavDropdown();
}

// For dynamic loading
document.addEventListener('DOMContentLoaded', function() {
  if (document.getElementById('nav-toggle')) {
    initNavDropdown();
  }
});
