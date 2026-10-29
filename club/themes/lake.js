window.ClubTheme = {
  render(root, { groups }) {
    const { esc, naira, media, wireCategoryNav, LOGO } = window.Club;

    root.innerHTML = `
      <header class="l-top">
        <div class="l-moon" aria-hidden="true"></div>
        <img class="club-logo" src="${LOGO}" alt="the Hideout …at lastdrop" width="210" height="82" />
        <p class="l-sub">by the water, after dark</p>
      </header>
      <nav class="l-tabs" aria-label="Categories">
        ${groups.map((g) => `<a href="#${g.id}" class="l-tab" data-target="${g.id}">${esc(g.name)}</a>`).join("")}
      </nav>
      ${groups
        .map(
          (g) => `
        <section class="l-sec" id="${g.id}">
          <h2>${esc(g.name)}</h2>
          <div class="l-grid">
            ${g.items
              .map(
                (i) => `
              <button type="button" class="l-item" data-item="${i._id}">
                <span class="l-pool">
                  <span class="l-b">${media(i, 96)}</span>
                  <span class="l-r" aria-hidden="true">${media(i, 96)}</span>
                </span>
                <span class="l-n">${esc(i.name)}</span>
                ${i.description ? `<span class="l-m">${esc(i.description)}</span>` : ""}
                <span class="l-p">${naira(i.price)}</span>
              </button>`,
              )
              .join("")}
          </div>
        </section>`,
        )
        .join("")}
      <p class="club-footer">Prices include all applicable taxes.</p>`;

    wireCategoryNav(root.querySelector(".l-tabs"), ".l-tab");
  },
};
