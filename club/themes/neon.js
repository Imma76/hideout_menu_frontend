window.ClubTheme = {
  render(root, { groups }) {
    const { esc, naira, media, LOGO } = window.Club;

    root.innerHTML = `
      <header class="n-top">
        <img class="club-logo" src="${LOGO}" alt="the Hideout …at lastdrop" width="140" height="55" />
        <span class="n-live">Tonight</span>
      </header>
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
