// Iceland in Numbers — every figure with its source and year.
// Figures were checked against Statistics Iceland, the World Bank, the IMF
// and the Icelandic Meteorological Office in November 2026. Where two
// publishers disagree by a little, the site names the publisher it follows.

export const META = {
  siteName: 'Iceland in Numbers',
  tagline: 'The people, economy and places of Iceland — every figure with its source and year.',
  updated: 'November 2026',
  note: 'Figures are as published by their sources and may be revised. A figure is never shown without the year it describes and the publisher behind it.',
};

// Resident population on 1 January, Statistics Iceland key figures 1703–2026.
export const POPULATION_SERIES = [
  { year: 2017, value: 332507 },
  { year: 2018, value: 342183 },
  { year: 2019, value: 349468 },
  { year: 2020, value: 354042 },
  { year: 2021, value: 358298 },
  { year: 2022, value: 364917 },
  { year: 2023, value: 375218 },
  { year: 2024, value: 383726 },
  { year: 2025, value: 389444 },
  { year: 2026, value: 394324 },
];

export const POPULATION_FACTS = {
  latest: { value: 389444, label: 'Population, 1 January 2025', source: 'Statistics Iceland', year: 2025 },
  growth: { value: '+1.5%', label: 'Growth on 1 January 2024', source: 'Statistics Iceland', year: 2025 },
  males: { value: 199622, label: 'Males, 1 January 2025', source: 'Statistics Iceland', year: 2025 },
  females: { value: 189623, label: 'Females, 1 January 2025', source: 'Statistics Iceland', year: 2025 },
  capitalRegion: { value: 253230, label: 'Capital region residents, 30 June 2026', source: 'Statistics Iceland', year: 2026 },
  capitalShare: { value: '62.7%', label: 'Live in the Greater Reykjavík urban area, 1 January 2026', source: 'Statistics Iceland', year: 2026 },
  foreignCitizens: { value: 70555, label: 'Foreign citizens, 1 January 2026 (17.9% of residents)', source: 'Statistics Iceland', year: 2026 },
  immigrants: { value: 77226, label: 'First-generation immigrants, 1 January 2026 (19.6%)', source: 'Statistics Iceland', year: 2026 },
  largestGroup: { value: 'Polish · 23,329', label: 'Largest foreign citizenship group, 1 January 2026', source: 'Statistics Iceland', year: 2026 },
  medianAge: { value: '36.2 years', label: 'Median age, 2025', source: 'World Bank', year: 2025 },
  area: { value: '103,000 km²', label: 'Land area', source: 'World Bank', year: 2024 },
  urban: { value: '94.2%', label: 'Urban population, 2025', source: 'World Bank', year: 2025 },
};

// Largest urban areas, 1 January 2026, Statistics Iceland table MAN03101.
export const TOWNS_URBAN = [
  { name: 'Reykjavík', population: 138753, note: 'Capital; the only city over 100,000' },
  { name: 'Kópavogur', population: 40228, note: 'Capital region' },
  { name: 'Hafnarfjörður', population: 32398, note: 'Capital region' },
  { name: 'Keflavík & Njarðvík', population: 22572, note: 'Reykjanes peninsula' },
  { name: 'Akureyri', population: 20067, note: 'Largest town outside the south-west' },
];

// Largest municipalities, 1 January 2026, Statistics Iceland.
export const TOWNS_MUNICIPAL = [
  { name: 'Reykjavík', population: 139804, share: '35.5%' },
  { name: 'Kópavogur', population: 40286, share: '10.2%' },
  { name: 'Hafnarfjörður', population: 32398, share: '8.2%' },
  { name: 'Reykjanesbær', population: 22697, share: '5.8%' },
  { name: 'Garðabær', population: 20724, share: '5.3%' },
  { name: 'Akureyri', population: 20284, share: '5.1%' },
];

// GDP per person, current US$, World Bank World Development Indicators.
export const GDP_PER_CAPITA = [
  { year: 2020, value: 60128 },
  { year: 2021, value: 70425 },
  { year: 2022, value: 76377 },
  { year: 2023, value: 82201 },
  { year: 2024, value: 85863 },
  { year: 2025, value: 98323 },
];

// GDP per person at purchasing power parity is shown only as a single
// verified fact (2024: $83,561, World Bank) — the full PPP series was not
// verified, so it is not charted here.

// Real GDP growth, % per year. World Bank for 2022–2024, IMF for 2025.
export const GDP_GROWTH = [
  { year: 2020, value: -6.6 },
  { year: 2021, value: 5.2 },
  { year: 2022, value: 8.9 },
  { year: 2023, value: 5.0 },
  { year: 2024, value: -0.9 },
  { year: 2025, value: 1.3 },
];

// Consumer price inflation, annual average %, IMF World Economic Outlook.
export const INFLATION = [
  { year: 2020, value: 2.8 },
  { year: 2021, value: 4.4 },
  { year: 2022, value: 8.3 },
  { year: 2023, value: 8.7 },
  { year: 2024, value: 5.9 },
  { year: 2025, value: 4.1 },
];

// Unemployment rate, % of labour force, IMF (Labour Force Survey).
export const UNEMPLOYMENT = [
  { year: 2020, value: 6.4 },
  { year: 2021, value: 6.0 },
  { year: 2022, value: 3.6 },
  { year: 2023, value: 3.4 },
  { year: 2024, value: 3.4 },
  { year: 2025, value: 4.3 },
];

export const ECONOMY_FACTS = {
  gdp: { value: '$33.2bn', label: 'GDP, current US$, 2024', source: 'World Bank', year: 2024 },
  gdpPerCapita: { value: '$85,863', label: 'GDP per person, current US$, 2024', source: 'World Bank', year: 2024 },
  gdpPerCapitaPpp: { value: '$83,561', label: 'GDP per person, PPP, 2024', source: 'World Bank', year: 2024 },
  gdpGrowth: { value: '−0.9%', label: 'Real GDP growth, 2024', source: 'World Bank', year: 2024 },
  inflation: { value: '5.9%', label: 'Consumer price inflation, 2024', source: 'IMF', year: 2024 },
  unemployment: { value: '3.4%', label: 'Unemployment rate, 2024', source: 'IMF', year: 2024 },
  labourForce: { value: '243,133', label: 'Labour force, 2024', source: 'World Bank', year: 2024 },
  participation: { value: '75.2%', label: 'Labour force participation, ages 15+, 2024', source: 'World Bank', year: 2024 },
  youthUnemployment: { value: '8.8%', label: 'Youth unemployment, ages 15–24, 2024', source: 'World Bank', year: 2024 },
  tourists: { value: '2,267,638', label: 'Foreign passenger departures at Keflavík, 2025', source: 'Statistics Iceland', year: 2025 },
  guestNights: { value: '9,850,428', label: 'Registered guest nights, 2025', source: 'Statistics Iceland', year: 2025 },
  tourismShare: { value: '8.8%', label: 'Tourism’s direct share of GDP, 2025 (preliminary)', source: 'Statistics Iceland', year: 2025 },
};

export const HEALTH_FACTS = {
  lifeExpectancy: { value: '82.8 years', label: 'Life expectancy at birth, 2024', source: 'World Bank', year: 2024 },
  lifeMen: { value: '81.2 years', label: 'Life expectancy, men, 2024', source: 'World Bank', year: 2024 },
  lifeWomen: { value: '84.5 years', label: 'Life expectancy, women, 2024', source: 'World Bank', year: 2024 },
  tertiary: { value: '48.8%', label: 'Adults 25–64 with tertiary education, 2024', source: 'Statistics Iceland', year: 2024 },
  internet: { value: '98.2%', label: 'Internet users, 2024', source: 'World Bank', year: 2024 },
  electricityAccess: { value: '100%', label: 'Access to electricity, 2024', source: 'World Bank', year: 2024 },
};

export const ENERGY_FACTS = {
  renewableShare: { value: '82.4%', label: 'Renewable share of final energy use, 2021', source: 'World Bank', year: 2021 },
  renewableElectricity: { value: '~100%', label: 'Renewable share of electricity (fossil share 0.0%, 2025)', source: 'World Bank', year: 2025 },
  hydro: { value: '69.9%', label: 'Hydropower share of electricity, 2025', source: 'World Bank', year: 2025 },
  geothermal: { value: '29.9%', label: 'Geothermal share of installed capacity, 2023', source: 'CIA World Factbook', year: 2023 },
  electricityPerPerson: { value: '47,510 kWh', label: 'Electricity use per person, 2025 — the highest in the world', source: 'World Bank', year: 2025 },
  primaryRenewable: { value: '~85%', label: 'Primary energy from domestic renewables', source: 'CIA World Factbook', year: 2024 },
};

// Reykjavík average daily highs and lows, °C, 1991–2020 climate normals.
// Icelandic Meteorological Office / WMO via NCEI.
export const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export const REYKJAVIK_HIGH = [3.2, 3.3, 4.2, 6.9, 10.1, 13.0, 14.9, 14.1, 11.4, 7.6, 4.7, 3.3];
export const REYKJAVIK_LOW = [-1.7, -1.9, -1.3, 1.0, 4.0, 7.2, 9.1, 8.6, 6.2, 2.7, -0.1, -1.6];

export const SOURCES = [
  { publisher: 'Statistics Iceland (Hagstofa Íslands)', what: 'Population, towns, tourism, education', link: 'statice.is' },
  { publisher: 'World Bank — World Development Indicators', what: 'GDP, GDP per person, life expectancy, energy, internet use', link: 'data.worldbank.org' },
  { publisher: 'IMF — World Economic Outlook', what: 'Inflation, unemployment, real GDP growth', link: 'imf.org' },
  { publisher: 'Icelandic Meteorological Office / WMO', what: 'Reykjavík 1991–2020 climate normals', link: 'vedur.is' },
  { publisher: 'CIA World Factbook', what: 'Energy mix, primary energy supply', link: 'cia.gov' },
];
