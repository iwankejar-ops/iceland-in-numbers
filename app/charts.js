// Iceland in Numbers — hand-built SVG charts. No libraries, no network:
// every chart is drawn from the figures in data.js and rendered as inline
// SVG so the page works fully offline.

const NS = 'http://www.w3.org/2000/svg';

function svgEl(tag, attrs = {}) {
  const el = document.createElementNS(NS, tag);
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, String(v));
  return el;
}

function niceMax(max) {
  const pow = Math.pow(10, Math.floor(Math.log10(max)));
  const n = max / pow;
  const step = n <= 1 ? 1 : n <= 1.2 ? 1.2 : n <= 1.5 ? 1.5 : n <= 2 ? 2 : n <= 2.5 ? 2.5 : n <= 5 ? 5 : 10;
  return step * pow;
}

function fmtNum(v) {
  return v.toLocaleString('en-US');
}

// Vertical bar chart. data: [{label, value}], valueFmt: (v) => string.
export function barChart(data, { height = 260, color = '#0f766e', valueFmt = fmtNum, yLabel = '' } = {}) {
  const W = 640, H = height, padL = 64, padR = 20, padT = 28, padB = 34;
  const max = niceMax(Math.max(...data.map(d => d.value)) * 1.05);
  const svg = svgEl('svg', { viewBox: `0 0 ${W} ${H}`, role: 'img', 'aria-label': 'Bar chart' });
  const innerW = W - padL - padR, innerH = H - padT - padB;
  // gridlines + y labels
  for (let i = 0; i <= 4; i++) {
    const v = (max * i) / 4;
    const y = padT + innerH - (v / max) * innerH;
    svg.appendChild(svgEl('line', { x1: padL, y1: y, x2: W - padR, y2: y, stroke: '#dce6e6', 'stroke-width': 1 }));
    const t = svgEl('text', { x: padL - 8, y: y + 4, 'text-anchor': 'end', 'font-size': 11, fill: '#5b6b6b' });
    t.textContent = fmtNum(v);
    svg.appendChild(t);
  }
  const slot = innerW / data.length;
  const barW = Math.min(56, slot * 0.62);
  data.forEach((d, i) => {
    const x = padL + slot * i + (slot - barW) / 2;
    const h = (d.value / max) * innerH;
    const y = padT + innerH - h;
    svg.appendChild(svgEl('rect', { x, y, width: barW, height: h, rx: 3, fill: color }));
    const val = svgEl('text', { x: x + barW / 2, y: y - 6, 'text-anchor': 'middle', 'font-size': 11, 'font-weight': 600, fill: '#0e2a33' });
    val.textContent = valueFmt(d.value);
    svg.appendChild(val);
    const lab = svgEl('text', { x: x + barW / 2, y: H - 12, 'text-anchor': 'middle', 'font-size': 11, fill: '#5b6b6b' });
    lab.textContent = d.label;
    svg.appendChild(lab);
  });
  if (yLabel) {
    const t = svgEl('text', { x: 12, y: 12, 'font-size': 11, fill: '#5b6b6b' });
    t.textContent = yLabel;
    svg.appendChild(t);
  }
  return svg;
}

// Line chart. data: [{label, value}], valueFmt formats point labels.
export function lineChart(data, { height = 260, color = '#0f766e', valueFmt = fmtNum, yLabel = '', minPad = 0.08 } = {}) {
  const W = 640, H = height, padL = 64, padR = 44, padT = 28, padB = 34;
  const values = data.map(d => d.value);
  let min = Math.min(...values), max = Math.max(...values);
  const span = (max - min) || 1;
  min -= span * minPad; max += span * minPad;
  if (min > 0 && min < max * 0.25) min = 0;
  const svg = svgEl('svg', { viewBox: `0 0 ${W} ${H}`, role: 'img', 'aria-label': 'Line chart' });
  const innerW = W - padL - padR, innerH = H - padT - padB;
  const yOf = v => padT + innerH - ((v - min) / (max - min)) * innerH;
  const xOf = i => padL + (i / (data.length - 1)) * innerW;
  for (let i = 0; i <= 4; i++) {
    const v = min + ((max - min) * i) / 4;
    const y = yOf(v);
    svg.appendChild(svgEl('line', { x1: padL, y1: y, x2: W - padR, y2: y, stroke: '#dce6e6', 'stroke-width': 1 }));
    const t = svgEl('text', { x: padL - 8, y: y + 4, 'text-anchor': 'end', 'font-size': 11, fill: '#5b6b6b' });
    t.textContent = fmtNum(Math.round(v));
    svg.appendChild(t);
  }
  const pts = data.map((d, i) => `${xOf(i)},${yOf(d.value)}`).join(' ');
  svg.appendChild(svgEl('polyline', { points: pts, fill: 'none', stroke: color, 'stroke-width': 2.5, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }));
  data.forEach((d, i) => {
    svg.appendChild(svgEl('circle', { cx: xOf(i), cy: yOf(d.value), r: 4, fill: '#fff', stroke: color, 'stroke-width': 2 }));
    const val = svgEl('text', { x: xOf(i), y: yOf(d.value) - 10, 'text-anchor': 'middle', 'font-size': 11, 'font-weight': 600, fill: '#0e2a33' });
    val.textContent = valueFmt(d.value);
    svg.appendChild(val);
    const lab = svgEl('text', { x: xOf(i), y: H - 12, 'text-anchor': 'middle', 'font-size': 11, fill: '#5b6b6b' });
    lab.textContent = d.label;
    svg.appendChild(lab);
  });
  if (yLabel) {
    const t = svgEl('text', { x: 12, y: 12, 'font-size': 11, fill: '#5b6b6b' });
    t.textContent = yLabel;
    svg.appendChild(t);
  }
  return svg;
}

// Two-series line chart (e.g. monthly highs and lows), with a legend.
export function dualLineChart(labels, seriesA, seriesB, { height = 280, labelA = 'Series A', labelB = 'Series B', colorA = '#c2410c', colorB = '#0f766e', valueSuffix = '' } = {}) {
  const W = 640, H = height, padL = 48, padR = 44, padT = 34, padB = 34;
  const all = [...seriesA, ...seriesB];
  let min = Math.min(...all), max = Math.max(...all);
  const span = (max - min) || 1;
  min = Math.floor(min - span * 0.1); max = Math.ceil(max + span * 0.1);
  const svg = svgEl('svg', { viewBox: `0 0 ${W} ${H}`, role: 'img', 'aria-label': 'Monthly temperature chart' });
  const innerW = W - padL - padR, innerH = H - padT - padB;
  const yOf = v => padT + innerH - ((v - min) / (max - min)) * innerH;
  const xOf = i => padL + (i / (labels.length - 1)) * innerW;
  for (let i = 0; i <= 4; i++) {
    const v = min + ((max - min) * i) / 4;
    const y = yOf(v);
    svg.appendChild(svgEl('line', { x1: padL, y1: y, x2: W - padR, y2: y, stroke: '#dce6e6', 'stroke-width': 1 }));
    const t = svgEl('text', { x: padL - 8, y: y + 4, 'text-anchor': 'end', 'font-size': 11, fill: '#5b6b6b' });
    t.textContent = `${Math.round(v)}°`;
    svg.appendChild(t);
  }
  // zero line
  if (min < 0 && max > 0) {
    svg.appendChild(svgEl('line', { x1: padL, y1: yOf(0), x2: W - padR, y2: yOf(0), stroke: '#9db3b3', 'stroke-width': 1, 'stroke-dasharray': '4 3' }));
  }
  for (const [series, color] of [[seriesA, colorA], [seriesB, colorB]]) {
    const pts = series.map((v, i) => `${xOf(i)},${yOf(v)}`).join(' ');
    svg.appendChild(svgEl('polyline', { points: pts, fill: 'none', stroke: color, 'stroke-width': 2.5, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }));
    series.forEach((v, i) => svg.appendChild(svgEl('circle', { cx: xOf(i), cy: yOf(v), r: 3.5, fill: '#fff', stroke: color, 'stroke-width': 2 })));
  }
  labels.forEach((lab, i) => {
    const t = svgEl('text', { x: xOf(i), y: H - 12, 'text-anchor': 'middle', 'font-size': 11, fill: '#5b6b6b' });
    t.textContent = lab;
    svg.appendChild(t);
  });
  // legend
  const legend = svgEl('g', { 'font-size': 12, fill: '#0e2a33' });
  const la = svgEl('g', {});
  la.appendChild(svgEl('line', { x1: padL, y1: 14, x2: padL + 22, y2: 14, stroke: colorA, 'stroke-width': 3 }));
  const ta = svgEl('text', { x: padL + 28, y: 18 }); ta.textContent = labelA; la.appendChild(ta);
  const lb = svgEl('g', {});
  lb.appendChild(svgEl('line', { x1: padL + 170, y1: 14, x2: padL + 192, y2: 14, stroke: colorB, 'stroke-width': 3 }));
  const tb = svgEl('text', { x: padL + 198, y: 18 }); tb.textContent = labelB; lb.appendChild(tb);
  legend.appendChild(la); legend.appendChild(lb);
  svg.appendChild(legend);
  return svg;
}

// Horizontal bar list for rankings (e.g. towns).
export function hbarList(rows, { valueFmt = fmtNum, color = '#0f766e' } = {}) {
  const W = 640, rowH = 44, padL = 170, padR = 90, padT = 8;
  const H = padT + rows.length * rowH + 8;
  const max = Math.max(...rows.map(r => r.value));
  const svg = svgEl('svg', { viewBox: `0 0 ${W} ${H}`, role: 'img', 'aria-label': 'Ranking bars' });
  rows.forEach((r, i) => {
    const y = padT + i * rowH;
    const lab = svgEl('text', { x: padL - 10, y: y + 22, 'text-anchor': 'end', 'font-size': 13, fill: '#0e2a33' });
    lab.textContent = r.label;
    svg.appendChild(lab);
    const w = ((r.value / max) * (W - padL - padR));
    svg.appendChild(svgEl('rect', { x: padL, y: y + 8, width: Math.max(2, w), height: 22, rx: 3, fill: color }));
    const val = svgEl('text', { x: padL + Math.max(2, w) + 8, y: y + 25, 'font-size': 12, 'font-weight': 600, fill: '#0e2a33' });
    val.textContent = valueFmt(r.value);
    svg.appendChild(val);
  });
  return svg;
}
