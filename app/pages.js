// Iceland in Numbers — page renderers. Each page is a function that returns
// HTML; charts and interactive controls are attached in mount() after the
// HTML is in the document.

import {
  META, POPULATION_SERIES, POPULATION_FACTS, TOWNS_URBAN, TOWNS_MUNICIPAL,
  GDP_PER_CAPITA, GDP_GROWTH, INFLATION, UNEMPLOYMENT, ECONOMY_FACTS,
  HEALTH_FACTS, ENERGY_FACTS, MONTHS, REYKJAVIK_HIGH, REYKJAVIK_LOW, SOURCES,
} from './data.js';
import { barChart, lineChart, dualLineChart, hbarList } from './charts.js';

const fmt = v => v.toLocaleString('en-US');

function factCard(f) {
  const shown = typeof f.value === 'number' ? f.value.toLocaleString('en-US') : f.value;
  return `<article class="fact">
    <div class="fact-value">${shown}</div>
    <div class="fact-label">${f.label}</div>
    <div class="fact-source">Source: ${f.source}, ${f.year}</div>
  </article>`;
}

function chartCard(title, mountId, sourceLine) {
  return `<section class="card">
    <h2>${title}</h2>
    <div class="chart" id="${mountId}"></div>
    <p class="source">${sourceLine}</p>
  </section>`;
}

function segControl(id, options, current) {
  return `<div class="seg" role="group" aria-label="Chart view" data-seg="${id}">
    ${options.map(o => `<button type="button" data-val="${o.value}" class="${o.value === current ? 'active' : ''}" aria-pressed="${o.value === current}">${o.label}</button>`).join('')}
  </div>`;
}

// ---------------- Overview ----------------

export function pageOverview() {
  return `
  <section class="hero">
    <h1>${META.siteName}</h1>
    <p class="tagline">${META.tagline}</p>
    <p class="updated">Figures checked ${META.updated}. ${META.note}</p>
  </section>

  <section class="facts">
    ${factCard(POPULATION_FACTS.latest)}
    ${factCard(ECONOMY_FACTS.gdpPerCapita)}
    ${factCard(ECONOMY_FACTS.unemployment)}
    ${factCard(HEALTH_FACTS.lifeExpectancy)}
    ${factCard(ENERGY_FACTS.renewableShare)}
    ${factCard(ECONOMY_FACTS.tourists)}
  </section>

  ${chartCard('Population, 2017–2026', 'ov-pop', 'Resident population on 1 January. Source: Statistics Iceland, key figures 1703–2026.')}

  <section class="card">
    <h2>Explore the numbers</h2>
    <div class="links">
      <a class="tile" href="#/population"><strong>Population</strong><span>How many people live in Iceland, where, and where they come from.</span></a>
      <a class="tile" href="#/economy"><strong>Economy</strong><span>Output, prices, jobs and the visitors who keep the tills ringing.</span></a>
      <a class="tile" href="#/energy"><strong>Energy &amp; climate</strong><span>A country that runs on waterfalls and volcanoes — and how cold it really gets.</span></a>
      <a class="tile" href="#/towns"><strong>Towns</strong><span>The five largest urban areas and the six largest municipalities.</span></a>
      <a class="tile" href="#/sources"><strong>Sources &amp; methods</strong><span>Every publisher behind every figure on this site.</span></a>
    </div>
  </section>

  <section class="card">
    <h2>Three things to know first</h2>
    <ol class="takeaways">
      <li><strong>Small and growing fast.</strong> Iceland had 394,324 residents on 1 January 2026 — up from 332,507 in 2017. Nearly two in three live around Reykjavík.</li>
      <li><strong>Rich, then a wobble.</strong> GDP per person reached $85,863 in 2024, but the economy shrank 0.9% that year and inflation was still 5.9%.</li>
      <li><strong>Almost fully renewable.</strong> 82.4% of all energy use came from renewables in 2021, and electricity is effectively 100% renewable — mostly hydro and geothermal.</li>
    </ol>
  </section>`;
}

export function mountOverview() {
  const host = document.getElementById('ov-pop');
  if (host) host.appendChild(lineChart(POPULATION_SERIES.map(p => ({ label: String(p.year), value: p.value })), { valueFmt: fmt, yLabel: 'Residents' }));
}

// ---------------- Population ----------------

export function pagePopulation() {
  return `
  <h1>Population</h1>
  <p class="lede">Iceland is one of Europe’s least crowded countries — about four people per square kilometre — and it has grown by a fifth in nine years.</p>

  <section class="facts">
    ${factCard(POPULATION_FACTS.latest)}
    ${factCard(POPULATION_FACTS.growth)}
    ${factCard(POPULATION_FACTS.medianAge)}
    ${factCard(POPULATION_FACTS.capitalShare)}
    ${factCard(POPULATION_FACTS.foreignCitizens)}
    ${factCard(POPULATION_FACTS.largestGroup)}
  </section>

  <section class="card">
    <h2>Resident population, 1 January</h2>
    ${segControl('pop-view', [{ value: 'line', label: 'Line' }, { value: 'bars', label: 'Bars' }], 'line')}
    <div class="chart" id="pop-chart"></div>
    <p class="source">Source: Statistics Iceland, key figures 1703–2026. The 2026 figure (394,324) is the 1 January estimate; a quarterly estimate put the population at 396,500 on 30 June 2026.</p>
  </section>

  <section class="card">
    <h2>Who lives here</h2>
    <ul class="bullets">
      <li><strong>Men and women, 1 January 2025:</strong> 199,622 men, 189,623 women, and 199 people recorded as non-binary or other.</li>
      <li><strong>Capital region, 30 June 2026:</strong> 253,230 people — 63.9% of the country — live in the capital region.</li>
      <li><strong>New Icelanders:</strong> 70,555 residents (17.9%) are foreign citizens and 77,226 (19.6%) are first-generation immigrants. The largest group is Polish, at 23,329 people.</li>
      <li><strong>Very urban:</strong> 94.2% of Icelanders live in urban areas (World Bank, 2025), and the median age is 36.2 years.</li>
    </ul>
    <p class="source">Sources: Statistics Iceland, 1 January 2025 and 1 January 2026; World Bank, 2025.</p>
  </section>`;
}

export function mountPopulation() {
  const host = document.getElementById('pop-chart');
  if (!host) return;
  const draw = view => {
    host.innerHTML = '';
    const data = POPULATION_SERIES.map(p => ({ label: String(p.year), value: p.value }));
    host.appendChild(view === 'bars'
      ? barChart(data, { valueFmt: fmt, yLabel: 'Residents' })
      : lineChart(data, { valueFmt: fmt, yLabel: 'Residents' }));
  };
  draw('line');
  document.querySelector('[data-seg="pop-view"]').addEventListener('click', e => {
    const btn = e.target.closest('button');
    if (!btn) return;
    document.querySelectorAll('[data-seg="pop-view"] button').forEach(b => { b.classList.remove('active'); b.setAttribute('aria-pressed', 'false'); });
    btn.classList.add('active'); btn.setAttribute('aria-pressed', 'true');
    draw(btn.dataset.val);
  });
}

// ---------------- Economy ----------------

export function pageEconomy() {
  return `
  <h1>Economy</h1>
  <p class="lede">A small, open economy that boomed after the pandemic, then cooled sharply in 2024 — with tourism back at the heart of it.</p>

  <section class="facts">
    ${factCard(ECONOMY_FACTS.gdp)}
    ${factCard(ECONOMY_FACTS.gdpPerCapita)}
    ${factCard(ECONOMY_FACTS.gdpPerCapitaPpp)}
    ${factCard(ECONOMY_FACTS.gdpGrowth)}
    ${factCard(ECONOMY_FACTS.inflation)}
    ${factCard(ECONOMY_FACTS.unemployment)}
  </section>

  <section class="card">
    <h2>The economy at a glance</h2>
    ${segControl('econ-view', [{ value: 'gdp', label: 'GDP per person' }, { value: 'growth', label: 'Real growth' }], 'gdp')}
    <div class="chart" id="econ-chart"></div>
    <p class="source" id="econ-source">GDP per person, current US$. Source: World Bank, World Development Indicators.</p>
  </section>

  ${chartCard('Consumer prices, annual average inflation', 'econ-infl', 'Consumer price inflation, annual average. Source: IMF, World Economic Outlook. 2025 is the IMF estimate.')}
  ${chartCard('Unemployment, % of the labour force', 'econ-unemp', 'Unemployment rate, % of the labour force (Labour Force Survey). Source: IMF, World Economic Outlook.')}

  <section class="card">
    <h2>Jobs and visitors</h2>
    <div class="facts">
      ${factCard(ECONOMY_FACTS.labourForce)}
      ${factCard(ECONOMY_FACTS.participation)}
      ${factCard(ECONOMY_FACTS.youthUnemployment)}
      ${factCard(ECONOMY_FACTS.tourists)}
      ${factCard(ECONOMY_FACTS.guestNights)}
      ${factCard(ECONOMY_FACTS.tourismShare)}
    </div>
    <p class="source">Labour figures: World Bank, 2024. Tourism figures: Statistics Iceland, 2025; the 8.8% share of GDP is preliminary. Foreign visitors numbered about 2.3 million in 2024.</p>
  </section>`;
}

export function mountEconomy() {
  const host = document.getElementById('econ-chart');
  const source = document.getElementById('econ-source');
  const draw = view => {
    if (!host) return;
    host.innerHTML = '';
    if (view === 'gdp') {
      host.appendChild(barChart(GDP_PER_CAPITA.map(d => ({ label: String(d.year), value: d.value })), { valueFmt: v => '$' + fmt(v), yLabel: 'Current US$ per person' }));
      source.textContent = 'GDP per person, current US$. Source: World Bank, World Development Indicators.';
    } else {
      host.appendChild(lineChart(GDP_GROWTH.map(d => ({ label: String(d.year), value: d.value })), { valueFmt: v => v.toFixed(1) + '%', yLabel: '% change, year on year', color: '#c2410c' }));
      source.textContent = 'Real GDP growth, % per year. Sources: World Bank (2020–2024); IMF (2025).';
    }
  };
  draw('gdp');
  const seg = document.querySelector('[data-seg="econ-view"]');
  if (seg) seg.addEventListener('click', e => {
    const btn = e.target.closest('button');
    if (!btn) return;
    seg.querySelectorAll('button').forEach(b => { b.classList.remove('active'); b.setAttribute('aria-pressed', 'false'); });
    btn.classList.add('active'); btn.setAttribute('aria-pressed', 'true');
    draw(btn.dataset.val);
  });
  const infl = document.getElementById('econ-infl');
  if (infl) infl.appendChild(lineChart(INFLATION.map(d => ({ label: String(d.year), value: d.value })), { valueFmt: v => v.toFixed(1) + '%', yLabel: '%', color: '#c2410c' }));
  const unemp = document.getElementById('econ-unemp');
  if (unemp) unemp.appendChild(lineChart(UNEMPLOYMENT.map(d => ({ label: String(d.year), value: d.value })), { valueFmt: v => v.toFixed(1) + '%', yLabel: '% of labour force' }));
}

// ---------------- Energy & climate ----------------

export function pageEnergy() {
  return `
  <h1>Energy &amp; climate</h1>
  <p class="lede">Iceland heats its homes with volcanoes and lights them with waterfalls. It uses more electricity per person than any other country — and almost none of it comes from fossil fuels.</p>

  <section class="facts">
    ${factCard(ENERGY_FACTS.renewableShare)}
    ${factCard(ENERGY_FACTS.renewableElectricity)}
    ${factCard(ENERGY_FACTS.hydro)}
    ${factCard(ENERGY_FACTS.geothermal)}
    ${factCard(ENERGY_FACTS.electricityPerPerson)}
    ${factCard(ENERGY_FACTS.primaryRenewable)}
  </section>

  <section class="card">
    <h2>Reykjavík through the year</h2>
    <p class="lede small">Average daily highs and lows, 1991–2020. Even in July, Reykjavík’s average high is 14.9°C — and January nights average −1.7°C.</p>
    ${segControl('temp-view', [{ value: 'both', label: 'Highs & lows' }, { value: 'high', label: 'Highs only' }, { value: 'low', label: 'Lows only' }], 'both')}
    <div class="chart" id="temp-chart"></div>
    <p class="source">Source: Icelandic Meteorological Office / WMO, 1991–2020 climate normals (via NCEI).</p>
  </section>

  <section class="card">
    <h2>People</h2>
    <div class="facts">
      ${factCard(HEALTH_FACTS.lifeExpectancy)}
      ${factCard(HEALTH_FACTS.lifeMen)}
      ${factCard(HEALTH_FACTS.lifeWomen)}
      ${factCard(HEALTH_FACTS.tertiary)}
      ${factCard(HEALTH_FACTS.internet)}
      ${factCard(HEALTH_FACTS.electricityAccess)}
    </div>
    <p class="source">Life expectancy and internet use: World Bank, 2024. Tertiary education: Statistics Iceland, 2024. Electricity access: World Bank, 2024.</p>
  </section>`;
}

export function mountEnergy() {
  const host = document.getElementById('temp-chart');
  if (!host) return;
  const draw = view => {
    host.innerHTML = '';
    const a = view === 'low' ? REYKJAVIK_LOW : REYKJAVIK_HIGH;
    const b = view === 'high' ? REYKJAVIK_HIGH : REYKJAVIK_LOW;
    const la = view === 'low' ? 'Average low' : 'Average high';
    const lb = view === 'high' ? 'Average high' : 'Average low';
    host.appendChild(dualLineChart(MONTHS, a, b, { labelA: la, labelB: lb }));
  };
  draw('both');
  document.querySelector('[data-seg="temp-view"]').addEventListener('click', e => {
    const btn = e.target.closest('button');
    if (!btn) return;
    document.querySelectorAll('[data-seg="temp-view"] button').forEach(b => { b.classList.remove('active'); b.setAttribute('aria-pressed', 'false'); });
    btn.classList.add('active'); btn.setAttribute('aria-pressed', 'true');
    draw(btn.dataset.val);
  });
}

// ---------------- Towns ----------------

export function pageTowns() {
  return `
  <h1>Towns</h1>
  <p class="lede">Iceland’s population is concentrated in a handful of places. Click a column heading to sort; use the search box to filter.</p>

  ${chartCard('Largest urban areas, 1 January 2026', 'towns-bars', 'Urban areas, 1 January 2026. Source: Statistics Iceland, table MAN03101.')}

  <section class="card">
    <h2>Largest municipalities, 1 January 2026</h2>
    <label class="filter">Filter towns
      <input type="search" id="town-filter" placeholder="Type a town name…" aria-label="Filter towns by name">
    </label>
    <table class="data" id="town-table">
      <thead><tr>
        <th><button type="button" data-sort="name">Municipality</button></th>
        <th><button type="button" data-sort="population">Population</button></th>
        <th><button type="button" data-sort="share">Share of Iceland</button></th>
      </tr></thead>
      <tbody id="town-body"></tbody>
    </table>
    <p class="source">Source: Statistics Iceland, 1 January 2026. Shares are of the total population (394,324).</p>
  </section>

  <section class="card">
    <h2>Reading the map</h2>
    <ul class="bullets">
      <li>Five of the six largest municipalities sit in or next to Reykjavík. Only Akureyri, in the north, breaks the pattern.</li>
      <li>Keflavík &amp; Njarðvík (22,572) is where the international airport is — the town most visitors see first.</li>
      <li>Outside the south-west, towns are small: the largest, Akureyri, has about 20,000 people.</li>
    </ul>
  </section>`;
}

export function mountTowns() {
  const host = document.getElementById('towns-bars');
  if (host) host.appendChild(hbarList(TOWNS_URBAN.map(t => ({ label: t.name, value: t.population })), { valueFmt: fmt }));
  const body = document.getElementById('town-body');
  const filter = document.getElementById('town-filter');
  if (!body) return;
  let rows = [...TOWNS_MUNICIPAL];
  let sortKey = 'population', sortDir = -1;
  const render = () => {
    const q = (filter?.value || '').trim().toLowerCase();
    const shown = rows.filter(r => !q || r.name.toLowerCase().includes(q));
    body.innerHTML = shown.map(r => `<tr><td>${r.name}</td><td>${fmt(r.population)}</td><td>${r.share}</td></tr>`).join('')
      || '<tr><td colspan="3">No towns match that filter.</td></tr>';
  };
  const sort = key => {
    if (key === sortKey) sortDir *= -1; else { sortKey = key; sortDir = key === 'name' ? 1 : -1; }
    rows.sort((a, b) => {
      const av = key === 'name' ? a.name : key === 'share' ? parseFloat(a.share) : a.population;
      const bv = key === 'name' ? b.name : key === 'share' ? parseFloat(b.share) : b.population;
      return (av < bv ? -1 : av > bv ? 1 : 0) * sortDir;
    });
    render();
  };
  sort('population');
  document.querySelectorAll('#town-table th button').forEach(btn => btn.addEventListener('click', () => sort(btn.dataset.sort)));
  filter?.addEventListener('input', render);
}

// ---------------- Sources ----------------

export function pageSources() {
  return `
  <h1>Sources &amp; methods</h1>
  <p class="lede">A statistics site is only as good as its sources. Every figure on this site names the publisher and the year it describes; this page lists them all.</p>

  <section class="card">
    <h2>Publishers</h2>
    <table class="data">
      <thead><tr><th>Publisher</th><th>What it supplied</th><th>Site</th></tr></thead>
      <tbody>
        ${SOURCES.map(s => `<tr><td>${s.publisher}</td><td>${s.what}</td><td>${s.link}</td></tr>`).join('')}
      </tbody>
    </table>
  </section>

  <section class="card">
    <h2>How the figures were chosen</h2>
    <ul class="bullets">
      <li><strong>One figure, one year.</strong> Every number carries the year it describes — a 2024 figure is never presented as “today”.</li>
      <li><strong>Publisher named.</strong> Where two publishers differ slightly (for example, GDP per person for 2024: $85,863 from the World Bank, $86,473 from Statistics Iceland), the site says which one it follows.</li>
      <li><strong>Estimates labelled.</strong> The IMF’s 2025 inflation and unemployment figures, and Statistics Iceland’s 30 June 2026 population estimate, are estimates, not final counts.</li>
      <li><strong>Nothing unverified.</strong> A figure that could not be checked against a publisher was left out rather than estimated.</li>
    </ul>
  </section>

  <section class="card">
    <h2>About this site</h2>
    <p>“Iceland in Numbers” was built as an entry for the make.fun bounty <em>Make the best national statistics site</em> (November 2026). It is a static site: no accounts, no tracking, no network requests — every figure and chart lives in the files you are reading. Figures were checked in November 2026 and may since have been revised by their publishers.</p>
  </section>`;
}

export function mountSources() {}
