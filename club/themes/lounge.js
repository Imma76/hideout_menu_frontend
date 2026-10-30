window.ClubTheme = {
  render(root, { groups }) {
    const { esc, naira, media, wireCategoryNav, LOGO } = window.Club;

    // Line icon and small caption under each category heading.
    const ICONS = {
      flute: '<path d="M10 2h4l.4 7.5a2.4 2.4 0 0 1-4.8 0z"/><path d="M12 12v8M9 21h6"/>',
      snifter: '<path d="M7 6h10c1.2 3 1 7-1.5 8.6a6 6 0 0 1-7 0C6 13 5.8 9 7 6z"/><path d="M12 16v4M8.5 21h7"/>',
      rocks: '<path d="M5 6h14l-1.4 13a2 2 0 0 1-2 1.8H8.4a2 2 0 0 1-2-1.8z"/><path d="M6.4 11h11.2"/><rect x="9" y="12.5" width="4" height="4" rx=".6" transform="rotate(-12 11 14.5)"/>',
      shot: '<path d="M7 5h10l-1.5 15h-7z"/><path d="M7.6 10h8.8"/>',
      wine: '<path d="M8 2h8c.6 4 .2 8-4 9-4.2-1-4.6-5-4-9z"/><path d="M12 11v9M8.5 21h7"/>',
      copa: '<path d="M5.5 4h13c0 4.5-2.9 7.5-6.5 7.5S5.5 8.5 5.5 4z"/><path d="M12 11.5V20M8.5 21h7"/>',
      cordial: '<path d="M7 4h10l-1 9a4 4 0 0 1-8 0z"/><path d="M12 17v3M9 21h6"/>',
      highball: '<path d="M7 6h10l-1.2 14.2a1 1 0 0 1-1 .8H9.2a1 1 0 0 1-1-.8z"/><path d="M14 6l2-4h2M7.4 10h9.2"/>',
      can: '<path d="M8 3h8l1 2v14l-1 2H8l-1-2V5z"/><path d="M7 7h10M7 17h10"/>',
      martini: '<path d="M4 4h16l-8 9z"/><path d="M12 13v7M8 21h8"/>',
    };
    const KINDS = [
      [/champ|sparkl|prosecco/, "flute", "Brut & rosé"],
      [/cognac|brandy/, "snifter", "VS · VSOP · XO"],
      [/whisk/, "rocks", "Single malt & blended"],
      [/tequila|mezcal/, "shot", "Agave spirits"],
      [/wine/, "wine", "Reds by the bottle"],
      [/gin/, "copa", "Botanical"],
      [/cream|liqueur/, "cordial", "Liqueur"],
      [/juice/, "highball", "Juices & mixers"],
      [/soft|soda|water/, "can", "Ice cold"],
    ];
    const kind = (g) => {
      const n = g.name.toLowerCase();
      const k = KINDS.find(([re]) => re.test(n));
      return k
        ? { icon: k[1], sub: k[2] }
        : { icon: "martini", sub: `${g.items.length} ${g.items.length === 1 ? "bottle" : "bottles"}` };
    };
    const icon = (name) =>
      `<svg class="ls-icon" viewBox="0 0 24 24" width="30" height="30" aria-hidden="true">${ICONS[name]}</svg>`;

    let n = 0;
    const row = (i) => `
      <button type="button" class="ls-row" data-item="${i._id}">
        <span class="ls-thumb" style="--bx:${(n++ * 37) % 100}%">${media(i, 76)}</span>
        <span class="ls-text">
          <span class="ls-n">${esc(i.name)}</span>
          ${i.description ? `<span class="ls-d">${esc(i.description)}</span>` : ""}
          <span class="ls-p">${naira(i.price)}</span>
        </span>
        <svg class="ls-chev" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>
      </button>`;

    root.innerHTML = `
      <header class="ls-top">
        <img class="club-logo" src="${LOGO}" alt="the Hideout …at lastdrop" width="150" height="58" />
        <p class="ls-tag"><span>Club drinks</span><span>Till the</span><span>last drop</span></p>
      </header>
      <nav class="ls-chips" aria-label="Categories">
        ${groups.map((g) => `<a href="#${g.id}" class="ls-chip" data-target="${g.id}">${esc(g.name)}</a>`).join("")}
      </nav>
      ${groups
        .map((g) => {
          const k = kind(g);
          return `
        <section class="ls-sec" id="${g.id}">
          <h2 class="ls-h">${icon(k.icon)}<span class="ls-title">${esc(g.name)}</span><small>${esc(k.sub)}</small></h2>
          <div class="ls-list">${g.items.map(row).join("")}</div>
        </section>`;
        })
        .join("")}
      <p class="club-footer">Prices include all applicable taxes.</p>`;

    wireCategoryNav(root.querySelector(".ls-chips"), ".ls-chip");
  },
};
