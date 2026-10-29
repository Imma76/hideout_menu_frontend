window.ClubTheme = {
  render(root, { groups, featured }) {
    const { esc, naira, media, LOGO } = window.Club;
    const all = groups.flatMap((g) => g.items);
    const hero = featured[0] || all.reduce((a, b) => (b.price > a.price ? b : a), all[0]);
    const longestWord = Math.max(...hero.name.split(/\s+/).map((w) => w.length));
    const heroSize = longestWord > 9 ? 19 : longestWord > 7 ? 25 : 30;

    root.innerHTML = `
      <header class="n-top">
        <img class="club-logo" src="${LOGO}" alt="the Hideout …at lastdrop" width="140" height="55" />
        <span class="n-live">Tonight</span>
      </header>
      <button type="button" class="n-hero" data-item="${hero._id}">
        <span class="n-hero-t">
          <span class="n-kick">Bottle of the night</span>
          <span class="n-big" style="font-size:${heroSize}px">${esc(hero.name)}</span>
          <span class="n-hp">${naira(hero.price)}</span>
          ${hero.description ? `<span class="n-hd">${esc(hero.description)}</span>` : ""}
        </span>
        <span class="n-hero-img">${media(hero, 200)}</span>
      </button>
      ${groups
        .map(
          (g) => `
        <section class="n-sec" id="${g.id}">
          <div class="n-rowh"><h2>${esc(g.name)}</h2><span>${g.items.length} ${g.items.length === 1 ? "bottle" : "bottles"}${g.items.length > 2 ? " →" : ""}</span></div>
          <div class="n-rail">
            ${g.items
              .map(
                (i) => `<button type="button" class="n-tile" data-item="${i._id}"><span class="n-img">${media(i, 92)}</span><span class="n-n">${esc(i.name)}</span><span class="n-p">${naira(i.price)}</span></button>`,
              )
              .join("")}
          </div>
        </section>`,
        )
        .join("")}
      <p class="club-footer">Prices include all applicable taxes.</p>`;
  },
};
