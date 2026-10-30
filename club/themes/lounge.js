window.ClubTheme = {
  render(root, { groups }) {
    const { esc, naira, media, wireCategoryNav, LOGO } = window.Club;

    // Tasting notes shown only in this theme (the other themes keep the admin's short
    // descriptions). If the client picks this theme, move these into the database
    // so they can be edited in the admin, and delete this map.
    const NOTES = {
      "Ace of Spades": "Brut Gold · rich and creamy, white peach, brioche, honey",
      "Dom Pérignon": "Vintage champagne · white flowers, citrus, toasted almond",
      "Cristal": "Louis Roederer prestige cuvée · citrus, white fruit, chalk",
      "Veuve Clicquot Brut": "Yellow Label · Pinot Noir-led, apple, brioche, vanilla",
      "Moët & Chandon Rosé": "Rosé Impérial · strawberry, raspberry, cherry",
      "Moët Brut": "Brut Impérial · green apple, citrus, fresh brioche",
      "Laurent-Perrier Rosé": "Cuvée Rosé · 100% Pinot Noir, fresh red berries",
      "Laurent-Perrier Brut": "La Cuvée · Chardonnay-led, citrus, white flowers",
      "Belaire Rosé": "Rare Rosé · French sparkling rosé, strawberry, raspberry",
      "Canard-Duchêne Rosé": "Authentic Rosé · Pinot Noir-led, red berries",
      "Canard-Duchêne Brut": "Authentic Brut · Pinot Noir-led, fresh fruit, light toast",
      "Hennessy XO": "Extra Old · candied fruit, dark chocolate, pepper",
      "Martell XO": "Extra Old · fig, sandalwood, warm spice",
      "Rémy Martin XO": "Fine Champagne XO · candied orange, plum, jasmine",
      "Hennessy VSOP": "Privilège · vanilla, toasted oak, cinnamon",
      "Rémy Martin 1738": "Accord Royal · toffee, baked bread, warm oak",
      "Martell Blue Swift": "VSOP finished in bourbon casks · vanilla, caramel",
      "Rémy Martin VSOP": "Fine Champagne · vanilla, ripe apricot, baked apple",
      "Hennessy VS": "Very Special · bold and fruity, toasted almond, oak",
      "Martell VS": "Very Special · plum, apricot, smooth finish",
      "Rémy Martin VS": "Very Special · fresh and fruity, apricot, vanilla",
      "Glenfiddich 23 Years": "Grand Cru · French cuvée cask finish, brioche, pear",
      "Macallan Rare Cask": "Sherry-seasoned oak · raisin, vanilla, chocolate, orange",
      "Glenfiddich 21 Years": "Gran Reserva · Caribbean rum cask finish, toffee, banana",
      "Teeling 21 Years": "Rising Reserve · bourbon and ruby port casks, limited edition",
      "Glenmorangie 18 Years": "Extremely Rare · Oloroso sherry finish, dried fruit, honey",
      "Glenfiddich 18 Years": "Small Batch Reserve · Oloroso and bourbon oak, baked apple",
      "Macallan 15 Years": "Double Cask · sherry oak, butterscotch, dried fruit",
      "Glenmorangie 14 Years": "Quinta Ruban · port cask finish, dark chocolate, orange",
      "Chivas Regal 18 Years": "Blended Scotch · dark chocolate, toffee, spice",
      "Macallan 12 Years": "Double Cask · sherry oak, honey, citrus, ginger",
      "Glenfiddich 15 Years": "Solera · honey, raisin, warm spice",
      "Glenmorangie 12 Years": "The Original 12 · bourbon cask, honeyed orange, peach",
      "Chivas Regal 15 Years": "XV · Cognac cask finish, orange, cinnamon, toffee",
      "Teeling Single Malt": "Irish single malt · five wine casks, fig, citrus, vanilla",
      "Observatory 20 Years": "Single grain Scotch · Signature Series, smooth and mellow",
      "Glenmorangie 10 Years": "The Original · smooth, citrus, peach, vanilla",
      "Chivas Regal 12 Years": "Blended Scotch · honey, vanilla, ripe apple",
      "Don Julio": "1942 Añejo · aged 2½ years, caramel, chocolate, roasted agave",
      "Casamigos": "Blanco · 100% blue agave, citrus, vanilla",
      "Salamanca Blanco": "Premium Blanco tequila · crisp, peppery agave",
      "1800 Tequila": "Silver · 100% blue agave, pepper, citrus",
      "Olmeca": "Silver · light and smooth, sweet agave, citrus",
      "Silk and Spice": "Portuguese red blend · blackberry, cocoa, spice",
      "Escudo Rojo": "Chilean red blend · black fruit, pepper, soft oak",
      "Cooper & Thief": "Bourbon barrel-aged red · blackberry, vanilla, oak",
      "Sandeman Sweet Red": "Fine Ruby Port · plum, cherry, sweet finish",
      "Hendrick's": "Scottish gin infused with rose and cucumber",
      "Baileys": "Irish whiskey, fresh cream, cocoa, vanilla",
      "Cranberry Juice": "Chilled · great on its own or as a mixer",
      "Chi Exotic": "Chivita Exotic · pineapple and coconut nectar",
      "Can Coke": "Coca-Cola Original Taste · ice cold",
      "Can Sprite": "Lemon-lime soda · ice cold",
      "Water": "Chilled bottled water",
    };
    groups.forEach((g) => g.items.forEach((i) => (i.description = NOTES[i.name] ?? i.description)));

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
