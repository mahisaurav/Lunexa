document.addEventListener('DOMContentLoaded', () => {
  // Navigation back to home
  const crossIcon = document.querySelector('.cross i');
  if (crossIcon) {
    crossIcon.addEventListener('click', () => {
      window.location.href = 'index.html';
    });
  }

  // Product database - extracted from your HTML
  const products = [
    { 
      id: 1, 
      name: 'Floral Summer Dress', 
      price: '₹1499', 
      category: 'dresses', 
      image: 'Image/Dresses/Image1.webp'
    },
    { 
      id: 2, 
      name: 'Made Like A Gun 001 - Royal Enfield', 
      price: '₹1999', 
      category: 'dresses', 
      image: 'Image/Dresses/Image2.webp'
    },
    { 
      id: 3, 
      name: 'Casual Shirt Dress', 
      price: '₹2100', 
      category: 'dresses', 
      image: 'Image/Dresses/Image3.webp'
    },
    { 
      id: 4, 
      name: 'Classic Midi Dress', 
      price: '₹1799', 
      category: 'men', 
      image: 'Image/MEN/men1.avif'
    },
    { 
      id: 5, 
      name: 'Striped Cotton Dress', 
      price: '₹1299', 
      category: 'men', 
      image: 'Image/MEN/men12.avif'
    },
    { 
      id: 6, 
      name: 'Enfield Graphic Tee', 
      price: '₹899', 
      category: 'men', 
      image: 'Image/MEN/men2.avif'
    },
    { 
      id: 7, 
      name: 'Denim Shirt Dress', 
      price: '₹1899', 
      category: 'men', 
      image: 'Image/MEN/men11.avif'
    },
    { 
      id: 8, 
      name: 'Elegant Party Dress', 
      price: '₹2499', 
      category: 'men', 
      image: 'Image/MEN/men3.avif'
    },
    // Additional products for better search results
    { 
      id: 9, 
      name: 'Winter Jacket', 
      price: '₹3499', 
      category: 'outerwear', 
      image: 'Image/MEN/men4.avif'
    },
    { 
      id: 10, 
      name: 'Summer Hat Collection', 
      price: '₹599', 
      category: 'accessories', 
      image: 'Image/Dresses/Accessories.avif'
    },
    { 
      id: 11, 
      name: 'Leather Boots', 
      price: '₹2999', 
      category: 'footwear', 
      image: 'Image/MEN/men5.avif'
    },
    { 
      id: 12, 
      name: 'Silk Scarf', 
      price: '₹899', 
      category: 'accessories', 
      image: 'Image/Dresses/Accessories2.avif'
    }
  ];

  // Get DOM elements
  const searchBar = document.querySelector('.search-bar');
  const searchIcon = document.querySelector('.search-icon');
  let selectedIndex = -1;
  
  // Create dropdown container
  const dropdownContainer = document.createElement('div');
  dropdownContainer.className = 'search-results';
  document.querySelector('.container').appendChild(dropdownContainer);
  
  // Handle search input
  searchBar.addEventListener('input', handleSearch);
  searchBar.addEventListener('keydown', handleKeyNavigation);
  searchIcon.addEventListener('click', performSearch);
  
  // Hide dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.container')) {
      dropdownContainer.style.display = 'none';
    }
  });

  // Search function
  function handleSearch() {
    const query = searchBar.value.toLowerCase().trim();
    
    // Reset selected index when search changes
    selectedIndex = -1;
    
    if (query.length < 2) {
      dropdownContainer.style.display = 'none';
      return;
    }
    
    // Filter products based on search query
    const filteredProducts = products.filter(product => 
      product.name.toLowerCase().includes(query) || 
      product.category.toLowerCase().includes(query)
    );
    
    // Display results
    if (filteredProducts.length > 0) {
      renderDropdown(filteredProducts, query);
      dropdownContainer.style.display = 'block';
    } else {
      dropdownContainer.style.display = 'none';
    }
  }
  
  // Render dropdown with search results
  function renderDropdown(results, query) {
    dropdownContainer.innerHTML = '';
    
    // Create results
    results.slice(0, 5).forEach((product, index) => {
      const resultItem = document.createElement('div');
      resultItem.className = 'result-item';
      resultItem.setAttribute('data-index', index);
      
      // Highlight matching text
      const highlightedName = highlightMatch(product.name, query);
      
      resultItem.innerHTML = `
        <div class="result-content">
          <img src="${product.image}" alt="${product.name}" class="result-image">
          <div class="result-details">
            <div class="result-name">${highlightedName}</div>
            <div class="result-price">${product.price}</div>
          </div>
        </div>
      `;
      
      // Add click event
      resultItem.addEventListener('click', () => {
        navigateToProduct(product);
      });
      
      dropdownContainer.appendChild(resultItem);
    });
    
    // Add "View all results" option if needed
    if (results.length > 5) {
      const viewAllItem = document.createElement('div');
      viewAllItem.className = 'view-all-results';
      viewAllItem.textContent = `View all ${results.length} results`;
      viewAllItem.addEventListener('click', () => {
        navigateToSearchResults(query);
      });
      dropdownContainer.appendChild(viewAllItem);
    }
  }
  
  // Highlight matching text in search results
  function highlightMatch(text, query) {
    if (!query) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<span class="highlight">$1</span>');
  }
  
  // Handle keyboard navigation
  function handleKeyNavigation(e) {
    const resultItems = document.querySelectorAll('.result-item');
    const viewAllItem = document.querySelector('.view-all-results');
    const itemCount = resultItems.length;
    
    // If dropdown is not visible, don't handle navigation
    if (dropdownContainer.style.display === 'none') return;
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (selectedIndex < itemCount - 1) {
          selectedIndex++;
          updateSelection(resultItems);
        } else if (viewAllItem) {
          selectedIndex = itemCount;
          updateSelection(resultItems, viewAllItem);
        }
        break;
        
      case 'ArrowUp':
        e.preventDefault();
        if (selectedIndex > 0) {
          selectedIndex--;
          updateSelection(resultItems);
        } else if (selectedIndex === 0) {
          selectedIndex = -1;
          updateSelection(resultItems);
        }
        break;
        
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < itemCount) {
          const selectedProduct = products[parseInt(resultItems[selectedIndex].getAttribute('data-index'))];
          navigateToProduct(selectedProduct);
        } else if (selectedIndex === itemCount && viewAllItem) {
          navigateToSearchResults(searchBar.value.trim());
        } else {
          performSearch();
        }
        break;
        
      case 'Escape':
        dropdownContainer.style.display = 'none';
        break;
    }
  }
  
  // Update visual selection in dropdown
  function updateSelection(resultItems, viewAllItem = null) {
    // Remove selected class from all items
    resultItems.forEach(item => item.classList.remove('selected'));
    if (viewAllItem) viewAllItem.classList.remove('selected');
    
    // Add selected class to current item
    if (selectedIndex >= 0 && selectedIndex < resultItems.length) {
      resultItems[selectedIndex].classList.add('selected');
      resultItems[selectedIndex].scrollIntoView({ block: 'nearest' });
    } else if (selectedIndex === resultItems.length && viewAllItem) {
      viewAllItem.classList.add('selected');
      viewAllItem.scrollIntoView({ block: 'nearest' });
    }
  }
  
  // Navigate to product page
  function navigateToProduct(product) {
    // Save selected product to session storage
    sessionStorage.setItem('selectedProduct', JSON.stringify(product));
    
    // Navigate to product page
    // In a real application, you would use a proper URL with product ID
    window.location.href = `product.html?id=${product.id}`;
  }
  
  // Navigate to search results page
  function navigateToSearchResults(query) {
    window.location.href = `search-results.html?q=${encodeURIComponent(query)}`;
  }
  
  // Perform search when clicking search icon or pressing enter
  function performSearch() {
    const query = searchBar.value.trim();
    if (query) {
      navigateToSearchResults(query);
    }
  }
  
  // Initialize search history from localStorage
  let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
  
  // Function to save search term to history
  function saveToHistory(term) {
    // Don't save if empty
    if (!term) return;
    
    // Remove if already exists (to avoid duplicates)
    searchHistory = searchHistory.filter(item => item !== term);
    
    // Add to beginning of array
    searchHistory.unshift(term);
    
    // Keep only the last 5 searches
    if (searchHistory.length > 5) {
      searchHistory = searchHistory.slice(0, 5);
    }
    
    // Save to localStorage
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  }
  
  // Show search history when focused and no input
  searchBar.addEventListener('focus', () => {
    if (!searchBar.value && searchHistory.length > 0) {
      showSearchHistory();
    }
  });
  
  // Show search history
  function showSearchHistory() {
    dropdownContainer.innerHTML = '';
    
    searchHistory.forEach(term => {
      const historyItem = document.createElement('div');
      historyItem.className = 'history-item';
      historyItem.innerHTML = `
        <i class="fas fa-history"></i>
        <span>${term}</span>
      `;
      
      historyItem.addEventListener('click', () => {
        searchBar.value = term;
        handleSearch();
      });
      
      dropdownContainer.appendChild(historyItem);
    });
    
    if (searchHistory.length > 0) {
      // Add clear history option
      const clearHistoryItem = document.createElement('div');
      clearHistoryItem.className = 'clear-history';
      clearHistoryItem.textContent = 'Clear search history';
      
      clearHistoryItem.addEventListener('click', () => {
        searchHistory = [];
        localStorage.removeItem('searchHistory');
        dropdownContainer.style.display = 'none';
      });
      
      dropdownContainer.appendChild(clearHistoryItem);
      dropdownContainer.style.display = 'block';
    }
  }
});