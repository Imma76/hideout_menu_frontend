const SECTION_LABELS = {
  food: 'Food Menu',
  drinks: 'Drinks & Beverages',
};
const SECTION_ORDER = ['food', 'drinks'];

function formatPrice(price) {
  return `₦${Number(price).toLocaleString('en-NG')}`;
}

async function loadMenu() {
  const root = document.getElementById('menu-root');
  const status = document.getElementById('status');

  try {
    const [categoriesRes, itemsRes] = await Promise.all([
      fetch(`${API_BASE_URL}/categories`),
      fetch(`${API_BASE_URL}/menu-items`),
    ]);

    if (!categoriesRes.ok || !itemsRes.ok) {
      throw new Error('Failed to fetch menu data');
    }

    const categories = await categoriesRes.json();
    const items = await itemsRes.json();

    const availableItems = items.filter((item) => item.available);

    if (categories.length === 0 || availableItems.length === 0) {
      status.textContent = 'The menu is being updated. Please check back soon.';
      return;
    }

    root.innerHTML = '';

    SECTION_ORDER.forEach((section) => {
      const categoriesInSection = categories.filter((c) => c.section === section);
      if (categoriesInSection.length === 0) return;

      const sectionHasItems = categoriesInSection.some((category) =>
        availableItems.some((item) => item.category && item.category._id === category._id),
      );
      if (!sectionHasItems) return;

      const sectionEl = document.createElement('section');
      sectionEl.className = 'menu-section';

      const sectionTitle = document.createElement('h2');
      sectionTitle.className = 'section-title';
      sectionTitle.textContent = SECTION_LABELS[section] ?? section;
      sectionEl.appendChild(sectionTitle);

      categoriesInSection.forEach((category) => {
        const itemsInCategory = availableItems.filter(
          (item) => item.category && item.category._id === category._id,
        );

        if (itemsInCategory.length === 0) return;

        const block = document.createElement('div');
        block.className = 'category-block';

        const title = document.createElement('h3');
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

        sectionEl.appendChild(block);
      });

      root.appendChild(sectionEl);
    });

    if (root.children.length === 0) {
      root.innerHTML = '<p class="empty-state">The menu is being updated. Please check back soon.</p>';
    }
  } catch (err) {
    console.error(err);
    status.textContent = 'Could not load the menu right now. Please try again shortly.';
  }
}

loadMenu();
