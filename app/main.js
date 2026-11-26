// Iceland in Numbers — router and boot. Hash routing only: the site is a
// static bundle, so every page is a hash route and every link works offline.

import {
  pageOverview, mountOverview,
  pagePopulation, mountPopulation,
  pageEconomy, mountEconomy,
  pageEnergy, mountEnergy,
  pageTowns, mountTowns,
  pageSources, mountSources,
} from './pages.js';

const ROUTES = {
  '/': { title: 'Iceland in Numbers — overview', render: pageOverview, mount: mountOverview },
  '/population': { title: 'Population — Iceland in Numbers', render: pagePopulation, mount: mountPopulation },
  '/economy': { title: 'Economy — Iceland in Numbers', render: pageEconomy, mount: mountEconomy },
  '/energy': { title: 'Energy & climate — Iceland in Numbers', render: pageEnergy, mount: mountEnergy },
  '/towns': { title: 'Towns — Iceland in Numbers', render: pageTowns, mount: mountTowns },
  '/sources': { title: 'Sources & methods — Iceland in Numbers', render: pageSources, mount: mountSources },
};

function route() {
  const hash = window.location.hash || '#/';
  const path = hash.replace(/^#/, '') || '/';
  const page = ROUTES[path] || ROUTES['/'];
  const main = document.getElementById('app');
  main.innerHTML = page.render();
  document.title = page.title;
  document.querySelectorAll('nav a').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + (path === '/' ? '/' : path));
    if (a.getAttribute('href') === '#' + (path === '/' ? '/' : path)) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
  page.mount();
  window.scrollTo(0, 0);
}

window.addEventListener('hashchange', route);
route();
