console.log('DOC Dre in the house...');

const resourceList = document.getElementById('resources__list');

const state = {
  endpoints: []
};

fetch('/api/v1')
  .then(response => response.json())
  .then(json => setState(json.endpoints))
  .catch(error => console.warn(error));

const setState = data => {
  state.endpoints = data;
  render();
};

const render = () => {
  state.endpoints.forEach(resource => {
    const resourceItem = `
      <li class="resource">
        <h3>${resource.name}</h3>
        ${buildRoutes(resource.routes)}
      </li>
    `;
    resourceList.insertAdjacentHTML('beforeend', resourceItem);
  });
};

// build HTML from array and returns one large HTML string
const buildRoutes = routes => {
  return routes
    .map(route => {
      return `
      <section class="route">
        <h4>Method: ${route.method}</h4>
        <h4>Url: ${route.path}</h4>
        <p>${route.description}</p>
      </section>
    `;
    })
    .join('');
};