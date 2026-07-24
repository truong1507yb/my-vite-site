// Desenio Photo Gallery JavaScript

document.addEventListener('DOMContentLoaded', () => {
  // 1. Infinite Scroll Setup
  initInfiniteScroll();
});

function initInfiniteScroll() {
  const grid = document.getElementById('masonry-grid');
  const trigger = document.getElementById('infinite-scroll-trigger');
  const spinner = document.getElementById('loading-spinner');
  
  if (!grid || !trigger || !spinner) return;
  
  let currentPage = 1;
  let isFetching = false;
  let hasMore = true;
  
  // Set up IntersectionObserver to detect when scroll reaches trigger
  const observer = new IntersectionObserver((entries) => {
    const entry = entries[0];
    if (entry.isIntersecting && !isFetching && hasMore) {
      loadMoreImages();
    }
  }, {
    rootMargin: '150px' // Fetch before trigger enters view
  });
  
  observer.observe(trigger);
  
  function loadMoreImages() {
    isFetching = true;
    spinner.classList.remove('hidden');
    
    // Construct query parameters
    const query = window.QUERY_FILTER || '';
    const nextPage = currentPage + 1;
    const url = `${window.API_IMAGES_URL}?page=${nextPage}&q=${encodeURIComponent(query)}`;
    
    fetch(url)
      .then(response => response.json())
      .then(data => {
        isFetching = false;
        spinner.classList.add('hidden');
        
        if (data.images && data.images.length > 0) {
          currentPage = nextPage;
          hasMore = data.has_next;
          
          appendImagesToGrid(data.images);
        } else {
          hasMore = false;
        }
        
        if (!hasMore) {
          observer.unobserve(trigger);
        }
      })
      .catch(err => {
        console.error('Error fetching images:', err);
        isFetching = false;
        spinner.classList.add('hidden');
      });
  }
  
  function appendImagesToGrid(images) {
    images.forEach(img => {
      // Create element structure matching index.html item
      const col = document.createElement('div');
      col.className = 'gallery-item-wrapper';
      col.setAttribute('data-id', img.id);
      
      const detailUrl = `${window.IMAGE_DETAIL_BASE_URL}${img.id}`;
      const thumbUrl = `${window.THUMBNAIL_BASE_URL}${img.thumbnail}`;
      
      // Parse Date
      let displayDate = '';
      if (img.upload_date) {
        const parts = img.upload_date.split('-');
        if (parts.length === 3) {
          displayDate = `${parts[2]}/${parts[1]}/${parts[0]}`;
        }
      }
      
      col.innerHTML = `
        <a href="${detailUrl}" class="gallery-item-link">
          <div class="gallery-item-img-box">
            <img src="${thumbUrl}" alt="${escapeHtml(img.title)}" class="gallery-item-img" loading="lazy" />
            <div class="gallery-item-overlay">
              <div class="overlay-top">
                <span class="img-author"><i data-lucide="camera" class="me-1"></i> ${escapeHtml(img.author)}</span>
                <span class="img-date"><i data-lucide="calendar" class="me-1"></i> ${displayDate}</span>
              </div>
              <div class="overlay-middle">
                <h4 class="img-title">${escapeHtml(img.title)}</h4>
                ${img.caption ? `<p class="img-caption">${escapeHtml(truncate(img.caption, 60))}</p>` : ''}
              </div>
              <div class="overlay-bottom">
                <span class="btn-view-photo">Xem chi tiết <i data-lucide="arrow-right" class="ms-1"></i></span>
              </div>
            </div>
          </div>
        </a>
      `;
      
      grid.appendChild(col);
    });
    
    // Re-initialize newly appended Lucide icons
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }
}

// Helpers
function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function truncate(str, maxLen) {
  if (!str) return '';
  if (str.length <= maxLen) return str;
  return str.substring(0, maxLen) + '...';
}
