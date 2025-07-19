// CURUBA HOTEL Animations & Interactivity

document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });


  // Gallery slider functionality
  const sliderImages = [
    { text: 'Hotel Design 1', bg: '#e0e0e0', color: '#888' },
    { text: 'Hotel Design 2', bg: '#d0e6fa', color: '#2e8b57' }
  ];
  let sliderIndex = 0;
  const sliderImage = document.getElementById('slider-image');
  const sliderIndicator = document.getElementById('slider-indicator');
  const prevBtn = document.querySelector('.slider-btn.prev');
  const nextBtn = document.querySelector('.slider-btn.next');
  function updateSlider() {
    if (sliderImage) {
      sliderImage.textContent = sliderImages[sliderIndex].text;
      sliderImage.style.background = sliderImages[sliderIndex].bg;
      sliderImage.style.color = sliderImages[sliderIndex].color;
    }
    if (sliderIndicator) {
      sliderIndicator.textContent = `${sliderIndex + 1} / ${sliderImages.length}`;
    }
  }
  if (prevBtn && nextBtn && sliderImage) {
    prevBtn.addEventListener('click', () => {
      sliderIndex = (sliderIndex - 1 + sliderImages.length) % sliderImages.length;
      updateSlider();
    });
    nextBtn.addEventListener('click', () => {
      sliderIndex = (sliderIndex + 1) % sliderImages.length;
      updateSlider();
    });
    updateSlider();
  }


  // Order button functionality
  function parsePrice(priceStr) {
    // Remove $ and commas, then parse float
    return parseFloat(priceStr.replace(/[^\d.]/g, ''));
  }
  function showOrderDialog(itemName, price) {
    let quantity = prompt(`How many "${itemName}" would you like to order?`, "1");
    if (quantity === null) return; // Cancelled
    quantity = parseInt(quantity, 10);
    if (isNaN(quantity) || quantity < 1) {
      alert("Please enter a valid quantity.");
      return;
    }
    const total = (price * quantity).toFixed(2);
    alert(`You ordered ${quantity} x ${itemName}\nTotal: $${total}`);
    setTimeout(() => {
      alert('Order confirmed!');
    }, 100);
  }
  document.querySelectorAll('.order-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const item = btn.closest('.menu-item, .featured-item, .popular-item');
      if (!item) return;
      const name = item.querySelector('h3')?.textContent || 'Item';
      const priceStr = item.querySelector('.price')?.textContent || '$0';
      const price = parsePrice(priceStr);
      showOrderDialog(name, price);
    });
  });

  // Contact form animation
  const form = document.querySelector('.contact form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      form.classList.add('submitted');
      form.innerHTML = '<h3 style="color: #2e8b57;">Thank you for contacting us!</h3>';
    });
  }

  // Search bar functionality
  const searchForm = document.querySelector('.search-bar');
  const searchInput = document.getElementById('site-search');
  if (searchForm && searchInput) {
    searchForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const query = searchInput.value.trim().toLowerCase();
      if (!query) {
        // Show all sections and all items if search is empty
        document.querySelectorAll('main > section').forEach(sec => sec.style.display = '');
        document.querySelectorAll('.menu-item, .featured-item, .popular-item').forEach(item => item.style.display = '');
        return;
      }
      let found = false;
      // Search in section titles and descriptions
      document.querySelectorAll('main > section').forEach(section => {
        let sectionText = section.innerText.toLowerCase();
        if (sectionText.includes(query)) {
          section.style.display = '';
          found = true;
        } else {
          section.style.display = 'none';
        }
      });
      // Special handling for menu, featured, and popular items
      const menuSection = document.querySelector('.menu');
      const featuredSection = document.querySelector('.featured');
      const popularSection = document.querySelector('.popular');
      // Menu items
      if (menuSection) {
        let anyMenuVisible = false;
        document.querySelectorAll('.menu-item').forEach(item => {
          let itemText = item.innerText.toLowerCase();
          if (itemText.includes(query)) {
            item.style.display = '';
            anyMenuVisible = true;
          } else {
            item.style.display = 'none';
          }
        });
        menuSection.style.display = anyMenuVisible ? '' : 'none';
        if (anyMenuVisible) found = true;
      }
      // Featured items
      if (featuredSection) {
        let anyFeaturedVisible = false;
        document.querySelectorAll('.featured-item').forEach(item => {
          let itemText = item.innerText.toLowerCase();
          if (itemText.includes(query)) {
            item.style.display = '';
            anyFeaturedVisible = true;
          } else {
            item.style.display = 'none';
          }
        });
        featuredSection.style.display = anyFeaturedVisible ? '' : 'none';
        if (anyFeaturedVisible) found = true;
      }
      // Popular items
      if (popularSection) {
        let anyPopularVisible = false;
        document.querySelectorAll('.popular-item').forEach(item => {
          let itemText = item.innerText.toLowerCase();
          if (itemText.includes(query)) {
            item.style.display = '';
            anyPopularVisible = true;
          } else {
            item.style.display = 'none';
          }
        });
        popularSection.style.display = anyPopularVisible ? '' : 'none';
        if (anyPopularVisible) found = true;
      }
      // If nothing found, show a message
      if (!found) {
        let main = document.querySelector('main');
        let noResult = document.getElementById('no-result');
        if (!noResult) {
          noResult = document.createElement('div');
          noResult.id = 'no-result';
          noResult.style.textAlign = 'center';
          noResult.style.margin = '2rem';
          noResult.style.fontSize = '1.3rem';
          noResult.style.color = '#b00';
          main.appendChild(noResult);
        }
        noResult.textContent = 'No results found.';
      } else {
        let noResult = document.getElementById('no-result');
        if (noResult) noResult.remove();
      }
    });
    // Optional: live search as you type
    searchInput.addEventListener('input', function() {
      searchForm.dispatchEvent(new Event('submit'));
    });
  }
});
