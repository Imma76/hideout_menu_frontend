window.ClubTheme = {
  render(root, { groups, featured, count }) {
    const { esc, naira, media, wireCategoryNav, LOGO } = window.Club;

    const card = (i) => `
      <button type="button" class="s-card" data-item="${i._id}" data-search="${esc(`${i.name} ${i.description} ${i.category.name}`.toLowerCase())}">
        <span class="s-shelf">${media(i, 96)}</span>
        <span class="s-nm">${esc(i.name)}</span>
        ${i.description ? `<span class="s-meta">${esc(i.description)}</span>` : ""}
        <span class="s-pr">${naira(i.price)}</span>
      </button>`;

    root.innerHTML = `
      <header class="s-top">
        <img class="club-logo" src="${LOGO}" alt="the Hideout …at lastdrop" width="220" height="86" />
        <p class="s-sub">Club drinks</p>
      </header>
      <div class="s-bar">
        <label class="s-search">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
          <input type="search" id="s-q" placeholder="Search ${count} bottles" autocomplete="off" aria-label="Search bottles" />
        </label>
        <nav class="s-chips" aria-label="Categories">
          ${groups.map((g) => `<a href="#${g.id}" class="s-chip" data-target="${g.id}">${esc(g.name)}</a>`).join("")}
        </nav>
      </div>
      ${
        featured.length
          ? `<section class="s-sig" id="s-sig"><p class="s-lbl">Signature bottles</p><div class="s-rail">${featured
              .map(
                (i) => `<button type="button" class="s-sigc" data-item="${i._id}"><span class="s-shelf">${media(i, 88)}</span><span class="s-nm">${esc(i.name)}</span><span class="s-pr">${naira(i.price)}</span></button>`,
              )
              .join("")}</div></section>`
          : ""
      }
      ${groups
        .map(
          (g) => `<section class="s-sec" id="${g.id}"><h2>${esc(g.name)}</h2><div class="s-grid">${g.items.map(card).join("")}</div></section>`,
        )
        .join("")}
      <p class="s-empty" id="s-empty" hidden></p>
      <p class="club-footer">Prices include all applicable taxes.</p>`;

    wireCategoryNav(root.querySelector(".s-chips"), ".s-chip");

    const input = root.querySelector("#s-q");
    const empty = root.querySelector("#s-empty");
    const sig = root.querySelector("#s-sig");
    input.addEventListener("input", () => {
      const q = input.value.trim().toLowerCase();
      let shown = 0;
      root.querySelectorAll(".s-sec").forEach((sec) => {
        let n = 0;
        sec.querySelectorAll(".s-card").forEach((c) => {
          const hit = !q || c.dataset.search.includes(q);
          c.hidden = !hit;
          if (hit) n++;
        });
        sec.hidden = n === 0;
        shown += n;
      });
      if (sig) sig.hidden = !!q;
      empty.hidden = shown > 0;
      empty.textContent = shown ? "" : `No bottles match "${input.value.trim()}".`;
    });
  },
};
