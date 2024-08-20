const config = {
  rotationDelay: 0,
  scaleFactor: 0.75,
  degPerSec: 6,
  angles: { x: -100, y: -20, z: 0 },
  colors: {
    water: 'rgba(0, 255, 255, 0.4)',
    land: '#424447',
    saudiArabia: '#E2B714',
    hover: '#eee'
  }
};

const state = {
  currentCountry: null,
  lastTime: d3.now(),
  degPerMs: config.degPerSec / 1000,
  isDragging: false,
  startX: 0,
  startY: 0,
  saudiArabia: null
};

const elements = {
  countryLabel: d3.select('#countryLabel'),
  canvas: d3.select('#globe'),
  context: d3.select('#globe').node().getContext('2d')
};

const projection = d3.geoOrthographic().precision(0.1);
const path = d3.geoPath(projection).context(elements.context);
let autorotate, land, countries, countryList;

const setAngles = () => {
  const rotation = projection.rotate();
  rotation[0] = config.angles.x;
  rotation[1] = config.angles.y;
  rotation[2] = config.angles.z;
  projection.rotate(rotation);
};

const scale = () => {
  const width = document.documentElement.clientWidth * config.scaleFactor;
  const height = 350;

  elements.canvas.attr('width', width).attr('height', height);

  projection
    .scale(Math.min(width, height) / 2) // Ensure the globe fits the canvas
    .translate([width / 2, height / 2]); // Center the globe

  render();
};

const startRotation = (delay) => {
  autorotate.restart(rotate, delay || 0);
};

const dragstarted = (event) => {
  state.isDragging = true;
  state.startX = event.x;
  state.startY = event.y;
  autorotate.stop();
};

const dragged = (event) => {
  if (!state.isDragging) { return; }

  const sensitivity = 0.25;

  const dx = (event.x - state.startX) * sensitivity;
  const dy = (event.y - state.startY) * sensitivity;

  state.startX = event.x;
  state.startY = event.y;

  const rotation = projection.rotate();
  rotation[0] += dx;
  rotation[1] -= dy;
  projection.rotate(rotation);

  render();
};

const dragended = () => {
  state.isDragging = false;
  startRotation(config.rotationDelay);
};

const render = () => {
  const { context } = elements;
  const width = document.documentElement.clientWidth;
  const height = document.documentElement.clientHeight;
  context.clearRect(0, 0, width, height);
  fill({ type: 'Sphere' }, config.colors.water);

  fill(land, config.colors.land);

  if (state.saudiArabia) {
    elements.countryLabel.style('color', config.colors.saudiArabia);
    fill(state.saudiArabia, config.colors.saudiArabia);
  }

  if (state.currentCountry && state.currentCountry !== state.saudiArabia) {
    elements.countryLabel.style('color', 'white');
    fill(state.currentCountry, config.colors.hover);
  }
};

const fill = (obj, color) => {
  elements.context.beginPath();
  path(obj);
  elements.context.fillStyle = color;
  elements.context.fill();
};

const rotate = (elapsed) => {
  const now = d3.now();
  const diff = now - state.lastTime;
  if (diff < elapsed) {
    const rotation = projection.rotate();
    rotation[0] += diff * state.degPerMs;
    projection.rotate(rotation);
    render();
  }
  state.lastTime = now;
};

const loadData = async (cb) => {
  const world = await d3.json('https://unpkg.com/world-atlas@2.0.2/countries-110m.json');
  let countryNames = await d3.tsv('https://gist.githubusercontent.com/mbostock/4090846/raw/07e73f3c2d21558489604a0bc434b3a5cf41a867/world-country-names.tsv');
  countryNames[110].name = "Palestine";

  cb(world, countryNames);
};

const getCountry = (event) => {
  const [x, y] = d3.pointer(event, elements.canvas.node());
  const pos = projection.invert([x, y]);

  if (pos) {
    return countries.features.find((feature) =>
      feature.geometry.coordinates.some((polygon) =>
        d3.polygonContains(polygon, pos)
      )
    );
  }
  return null;
};

const mousemove = (event) => {
  const country = getCountry(event);

  if (!country && state.currentCountry) {
    leave(state.currentCountry);
    state.currentCountry = null;
    render();
    return;
  }

  if (country && country !== state.currentCountry) {
    state.currentCountry = country;
    render();
    enter(country);  // Call the enter function when the country changes
  }
};

const enter = (country) => {
  const name = countryList.find((c) => parseInt(c.id) === parseInt(country.id))?.name || '';
  elements.countryLabel.text(name);
};

const handleClick = (event) => {
  const country = getCountry(event);

  if (country) {
    const name = countryList.find((c) => parseInt(c.id) === parseInt(country.id))?.name || '';
    
    // Check if the clicked country is Pakistan
    if (name === 'Pakistan') {
      // Trigger the link click event to download the CV
      window.open('/Touseef-Shahbaz.pdf.pdf', '_blank');    }
  }
};

export const init = () => {
  setAngles();
  
  elements.canvas.call(
    d3.drag()
      .on('start', dragstarted)
      .on('drag', dragged)
      .on('end', dragended))
    .on('mousemove', mousemove)
    .on('click', handleClick)  // Add click handler here
    .on('touchmove', mousemove);

  loadData((world, cList) => {
    land = topojson.feature(world, world.objects.land);
    countries = topojson.feature(world, world.objects.countries);
    countryList = cList;

    state.saudiArabia = countries.features.find(country => {
      const countryData = countryList.find(c => parseInt(c.id, 10) === parseInt(country.id, 10));
      return countryData && countryData.name === 'Saudi Arabia';
    });

    window.addEventListener('resize', scale);
    scale();
    autorotate = d3.timer(rotate);
  });
};

init();
