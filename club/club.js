(function () {
  const THEMES = ["shelf", "neon", "lake", "backbar", "marble"];
  const CACHE_KEY = "hideout-club-cache-v1";
  const LOGO = "/assets/club-logo.webp";

  const requested = new URLSearchParams(location.search).get("theme");
  const theme = THEMES.includes(requested)
    ? requested
    : THEMES.includes(window.CLUB_THEME)
      ? window.CLUB_THEME
      : THEMES[0];
  document.documentElement.dataset.clubTheme = theme;

  const root = document.getElementById("club-root");
  const sheet = document.getElementById("club-sheet");
  let itemsById = new Map();

  // ---------- helpers shared by every theme ----------
  const esc = (s) =>
    String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

  const naira = (n) => "₦" + Number(n).toLocaleString("en-NG");

  const SHAPES = {
    champ: "M17 2h6v20c0 8 11 12 11 24v46a6 6 0 0 1-6 6H12a6 6 0 0 1-6-6V46c0-12 11-16 11-24z",
    square: "M16 4h8v13c0 3 10 4 10 10v65a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4V27c0-6 10-7 10-10z",
    decanter: "M17 4h6v18c10 4 15 12 15 30 0 28-8 44-18 44S2 80 2 52c0-18 5-26 15-30z",
    squat: "M15 10h10v12c0 2 11 3 11 10v58a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V32c0-7 11-8 11-10z",
    can: "M9 8h22l2 6v74l-2 6H9l-2-6V14z",
    tall: "M17 2h6v26c0 5 9 7 9 14v52a4 4 0 0 1-4 4H12a4 4 0 0 1-4-4V42c0-7 9-9 9-14z",
  };
  const GLASS = {
    champ: "#2c4033",
    decanter: "#7a3414",
    tall: "#86501f",
    square: "#b06a28",
    squat: "#d9ccb0",
    can: "#b8161c",
  };
  document.body.insertAdjacentHTML(
    "afterbegin",
    '<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs><linearGradient id="ph-shine" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".22" stop-color="#fff" stop-opacity=".35"/><stop offset=".34" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".3"/></linearGradient></defs></svg>',
  );
  function shapeFor(item) {
    const c = (item.category?.name || "").toLowerCase();
    const n = item.name.toLowerCase();
    if (/can |coke|sprite/.test(n)) return "can";
    if (/champ|sparkl|ros/.test(c)) return "champ";
    if (/cognac|brandy/.test(c)) return /xo/.test(n) ? "decanter" : "tall";
    if (/whisk/.test(c)) return "square";
    if (/tequila|gin/.test(c)) return "squat";
    return "tall";
  }

  // A real photo when the admin has uploaded one, otherwise a drawn bottle.
  function media(item, height, cls = "") {
    if (item.imageUrl) {
      return `<img class="bottle-img ${cls}" src="${esc(item.imageUrl)}" alt="${esc(item.name)}" style="height:${height}px" loading="lazy" decoding="async" />`;
    }
    const s = shapeFor(item);
    const d = SHAPES[s];
    return `<svg class="ph-bottle ${cls}" width="${Math.round(height * 0.4)}" height="${height}" viewBox="0 0 40 100" aria-hidden="true"><path d="${d}" fill="${GLASS[s]}"/><path d="${d}" fill="url(#ph-shine)"/><rect x="10" y="54" width="20" height="16" rx="2" fill="#efe6d2" opacity=".9"/></svg>`;
  }

  function openSheet(id) {
    const item = itemsById.get(id);
    if (!item) return;
    document.getElementById("sheet-media").innerHTML = media(item, 260);
    document.getElementById("sheet-cat").textContent = item.category?.name || "";
    document.getElementById("sheet-name").textContent = item.name;
    document.getElementById("sheet-desc").textContent = item.description || "";
    document.getElementById("sheet-price").textContent = naira(item.price);
    sheet.showModal();
  }
  document.getElementById("sheet-close").addEventListener("click", () => sheet.close());
  sheet.addEventListener("click", (e) => {
    if (e.target === sheet) sheet.close();
  });
  root.addEventListener("click", (e) => {
    const el = e.target.closest("[data-item]");
    if (el) openSheet(el.dataset.item);
  });

  // Scroll a category nav to its section and highlight whichever is on screen.
  function wireCategoryNav(nav, linkSelector) {
    const links = [...nav.querySelectorAll(linkSelector)];
    const sections = links.map((a) => document.getElementById(a.dataset.target)).filter(Boolean);
    const setActive = (id) =>
      links.forEach((a) => {
        const on = a.dataset.target === id;
        a.classList.toggle("is-active", on);
        if (on) a.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
      });
    nav.addEventListener("click", (e) => {
      const a = e.target.closest(linkSelector);
      if (!a) return;
      e.preventDefault();
      document.getElementById(a.dataset.target)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((en) => en.isIntersecting);
        if (visible.length) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    if (sections[0]) setActive(sections[0].id);
  }

  // ---------- data ----------
  function shape(menu) {
    const cats = menu.categories
      .filter((c) => c.section === "club")
      .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0) || a.name.localeCompare(b.name));
    const items = menu.items.filter((i) => i.available && i.category && i.category.section === "club");
    itemsById = new Map(items.map((i) => [i._id, i]));
    const groups = cats
      .map((c) => ({ id: "cat-" + c._id, name: c.name, items: items.filter((i) => i.category._id === c._id) }))
      .filter((g) => g.items.length);
    const featured = items.filter((i) => i.featured).sort((a, b) => b.price - a.price);
    return { groups, featured, count: items.length };
  }

  function readCache() {
    try {
      return JSON.parse(localStorage.getItem(CACHE_KEY));
    } catch {
      return null;
    }
  }
  function writeCache(menu) {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify(menu));
    } catch {}
  }

  let lastJson = "";
  function render(menu) {
    const json = JSON.stringify(menu);
    if (json === lastJson) return;
    lastJson = json;
    const data = shape(menu);
    if (!data.groups.length) {
      root.innerHTML = '<p class="club-status">The club menu is being updated. Ask your waiter for tonight\'s bottles.</p>';
      return;
    }
    window.ClubTheme.render(root, data);
  }

  function loadTheme() {
    return new Promise((resolve, reject) => {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = `/club/themes/${theme}.css?v=2`;
      document.head.appendChild(link);
      const script = document.createElement("script");
      script.src = `/club/themes/${theme}.js?v=2`;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  window.Club = { esc, naira, media, wireCategoryNav, LOGO };

  loadTheme().then(async () => {
    const cached = readCache();
    if (cached) render(cached);
    try {
      const res = await fetch(`${API_BASE_URL}/menu`);
      if (!res.ok) throw new Error(res.status);
      const menu = await res.json();
      writeCache(menu);
      render(menu);
    } catch {
      if (!cached) {
        root.innerHTML = '<p class="club-status">Couldn\'t load the menu. Check your connection and refresh.</p>';
      }
    }
  });
})();
