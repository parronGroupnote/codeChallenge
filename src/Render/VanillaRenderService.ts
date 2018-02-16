
import RenderService from './RenderService';

export default class VanillaRenderService implements RenderService {
  private grid;

  public constructor() {
    this.grid = true;
  }

  public renderScene(data) {
    renderHeader();
    renderList(data);
  }
}

function renderHeader() {
  const titleText: string = "Apps by Host";
  const subtitleText: string = "for user averylongemailadress@companyname.com"

  let container = document.createElement('div');
  container.id = 'header';

  let title = renderTitle(titleText)
  let subtitle = renderSubtitle(subtitleText);

  container.appendChild(title);
  container.appendChild(subtitle);

  let checkbox = renderCheckbox()
  let label = renderCheckboxLabel()

  container.appendChild(checkbox);
  container.appendChild(label);

  document.getElementById('scene').appendChild(container);
}

function renderList(data) {
  const maxColumns = 2;

  let hostList = document.createElement('div')
  hostList.id = 'hostList';
  hostList.className = 'double';

  let row = document.createElement('div');
  row.className = 'row';

  for (let entry in data) {
    if (row.childElementCount < maxColumns) {
      let host = data[entry]
      row.appendChild(renderBox(host));
    }

    if (row.childElementCount === maxColumns) {
      hostList.appendChild(row);
      row = document.createElement('div'); // reset row
      row.className = 'row';
    }
  }
  document.getElementById('scene').appendChild(hostList);
}

function onChangeCheckbox() {
  let hostList = document.getElementById("hostList")

  if (hostList.classList.contains('single')) hostList.className = 'double';
  else hostList.className = 'single';
}

function renderBox(host) {
  let boxDiv = document.createElement('div');
  boxDiv.className = 'box';

  let boxTitle = document.createElement('span');
  boxTitle.className = 'title';
  boxTitle.innerHTML = host.getId();

  let appsList = document.createElement('ul');

  const apps = host.getTopApps(5);
  for (let x = 0; x < apps.length; x++) {
    let app = renderApp(apps[x]);
    appsList.appendChild(app);
  }

  boxDiv.appendChild(boxTitle);
  boxDiv.appendChild(appsList);

  return boxDiv;
}

function renderApp(app) {
  let appItem = document.createElement('li');
  appItem.className = 'app';
  appItem.setAttribute('apdex', app.getApdex());
  appItem.onclick = () => alertVersion(app.getVersion());

  let appName = document.createElement('span');
  appName.innerHTML = app.getName();
  appItem.appendChild(appName);

  return appItem;
}

function alertVersion(version) {
  alert(version)
}

function renderCheckbox() {
  let checkbox = document.createElement('input');
  checkbox.className = "checkbox";
  checkbox.type = "checkbox";
  checkbox.name = "txt";
  checkbox.value = "Hello";
  checkbox.id = "checkbox";
  checkbox.onchange = onChangeCheckbox;
  return checkbox;
}

function renderCheckboxLabel() {
  let label = document.createElement('label')
  label.htmlFor = "checkbox";
  label.className = "checkbox";
  label.appendChild(document.createTextNode('Show as list'));
  return label;
}

function renderSubtitle(subtitle) {
  let subtitleContainer = document.createElement('span');
  subtitleContainer.className = 'subtitle';

  let subtitleText = document.createTextNode(subtitle);
  subtitleContainer.appendChild(subtitleText);
  return subtitleContainer;
}

function renderTitle(title) {
  let titleContainer = document.createElement('span');
  titleContainer.className = 'title';
  let titleText = document.createTextNode(title);
  titleContainer.appendChild(titleText);

  titleContainer.innerHTML += '&nbsp;';
  return titleContainer;
}