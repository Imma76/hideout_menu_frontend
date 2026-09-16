const CACHE_KEY = 'hideout-menu-cache-v1';

function formatPrice(price) {
  return `₦${Number(price).toLocaleString('en-NG')}`;
}

function renderSection(categories, items, sectionKey) {
  const root = document.getElementById('menu-root');
  const status = document.getElementById('status');

  const availableItems = items.filter((item) => item.available);
  const categoriesInSection = categories.filter((c) => c.section === sectionKey);

  root.innerHTML = '';

  categoriesInSection.forEach((category) => {
    const itemsInCategory = availableItems.filter(
      (item) => item.category && item.category._id === category._id,
    );

    if (itemsInCategory.length === 0) return;

    const block = document.createElement('div');
    block.className = 'category-block';

    const title = document.createElement('h2');
    title.className = 'category-title';
    title.textContent = category.name;
    block.appendChild(title);

    itemsInCategory.forEach((item) => {
      const row = document.createElement('div');
      row.className = 'menu-item';

      const info = document.createElement('div');
      info.className = 'item-info';

      const name = document.createElement('div');
      name.className = 'item-name';
      name.textContent = item.name;
      info.appendChild(name);

      if (item.description) {
        const desc = document.createElement('div');
        desc.className = 'item-description';
        desc.textContent = item.description;
        info.appendChild(desc);
      }

      const price = document.createElement('div');
      price.className = 'item-price';
      price.textContent = formatPrice(item.price);

      row.appendChild(info);
      row.appendChild(price);
      block.appendChild(row);
    });

    root.appendChild(block);
  });

  if (root.children.length === 0) {
    status.textContent = 'This section is being updated. Please check back soon.';
  } else {
    status.textContent = '';
  }
}

function readCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (err) {
    return null;
  }
}

function writeCache(data) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
  } catch (err) {
    // Storage full or unavailable (private mode) — safe to skip caching.
  }
}

async function loadSection(sectionKey) {
  // Render whatever we last saw instantly, before any network round trip —
  // the fetch below always runs anyway, so this never shows stale data for
  // longer than one page load.
  const cached = readCache();
  if (cached) {
    renderSection(cached.categories, cached.items, sectionKey);
  }

  try {
    const res = await fetch(`${API_BASE_URL}/menu`);
    if (!res.ok) throw new Error('Failed to fetch menu data');

    const { categories, items } = await res.json();
    writeCache({ categories, items });
    renderSection(categories, items, sectionKey);
  } catch (err) {
    console.error(err);
    if (!cached) {
      document.getElementById('status').textContent =
        'Could not load the menu right now. Please try again shortly.';
    }
  }
}

const sectionKey = document.body.dataset.section;
if (sectionKey) {
  loadSection(sectionKey);
}
