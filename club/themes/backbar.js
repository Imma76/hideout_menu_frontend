window.ClubTheme = {
  render(root, { groups }) {
    const { esc, naira, media, wireCategoryNav, LOGO } = window.Club;

    const rows = (items) => {
      const out = [];
      for (let i = 0; i < items.length; i += 3) out.push(items.slice(i, i + 3));
      return out;
    };
    const shelf = (items) => `
      <div class="bb-shelf">
        <div class="bb-bays">
          ${items.map((i) => `<button type="button" class="bb-bay" data-item="${i._id}" aria-label="${esc(i.name)}">${media(i, 172)}</button>`).join("")}
        </div>
        <div class="bb-plank" aria-hidden="true"></div>
        <div class="bb-labels">
          ${items
            .map(
              (i) => `<button type="button" class="bb-label" data-item="${i._id}"><span class="bb-n">${esc(i.name)}</span><span class="bb-p">${naira(i.price)}</span></button>`,
            )
            .join("")}
        </div>
      </div>`;

    root.innerHTML = `
      <div class="bb-wall" aria-hidden="true"></div>
      <header class="bb-top">
        <img class="club-logo" src="${LOGO}" alt="the Hideout …at lastdrop" width="220" height="86" />
        <p class="bb-sub">Club drinks</p>
      </header>
      <nav class="bb-tabs" aria-label="Categories">
        ${groups.map((g) => `<a href="#${g.id}" class="bb-tab" data-target="${g.id}">${esc(g.name)}</a>`).join("")}
      </nav>
      ${groups
        .map(
          (g) => `<section class="bb-sec" id="${g.id}"><h2 class="bb-plaque">${esc(g.name)}</h2>${rows(g.items).map(shelf).join("")}</section>`,
        )
        .join("")}
      <p class="club-footer">Prices include all applicable taxes.</p>`;

    wireCategoryNav(root.querySelector(".bb-tabs"), ".bb-tab");
  },
};
