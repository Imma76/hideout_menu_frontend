window.ClubTheme = {
  render(root, { groups }) {
    const { esc, naira, media, wireCategoryNav, LOGO } = window.Club;

    const scene = (i) => `
      <button type="button" class="mb-scene" data-item="${i._id}">
        <span class="mb-stand">${media(i, 226)}</span>
        <span class="mb-refl" aria-hidden="true">${media(i, 226)}</span>
        <span class="mb-info">
          <span class="mb-n">${esc(i.name)}</span>
          ${i.description ? `<span class="mb-d">${esc(i.description)}</span>` : ""}
          <span class="mb-p">${naira(i.price)}</span>
        </span>
      </button>`;

    root.innerHTML = `
      <div class="mb-bg" aria-hidden="true"></div>
      <header class="mb-top">
        <img class="club-logo" src="${LOGO}" alt="the Hideout …at lastdrop" width="160" height="62" />
        <span>Club drinks</span>
      </header>
      <nav class="mb-chips" aria-label="Categories">
        ${groups.map((g) => `<a href="#${g.id}" class="mb-chip" data-target="${g.id}">${esc(g.name)}</a>`).join("")}
      </nav>
      ${groups
        .map(
          (g) => `
        <section class="mb-sec" id="${g.id}">
          <h2>${esc(g.name)}<small>${g.items.length} ${g.items.length === 1 ? "bottle" : "bottles"}</small></h2>
          <div class="mb-rail"><div class="mb-track">${g.items.map(scene).join("")}</div></div>
        </section>`,
        )
        .join("")}
      <p class="club-footer">Prices include all applicable taxes.</p>`;

    wireCategoryNav(root.querySelector(".mb-chips"), ".mb-chip");
  },
};
