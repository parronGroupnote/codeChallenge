
import DataRepository from './DataRepository';
import * as hostAppData from '../../public/data.json';
import App from '../Common/App';
import Host from '../Common/Host';

export default class MemoryDataRepository implements DataRepository {
  private hosts;
  private initialized;

  public constructor() {
    this.hosts = {};
    this.initialized = false;
  }

  public getHosts() {
    if (!this.initialized) {
      this.hosts = readFromJson();
      this.initialized = true;
      return this.hosts;
    }
    return this.hosts;
  }
}

// JSON initializer (simple and not optimized for brevity as specified)
function readFromJson() {
  const applications = hostAppData; 

  let hosts = {};

  for (let x = 0; x < (<any>applications).length; x++) {
    let app = applications[x];
    let newApp = new App(app.name, app.contributors, app.version, app.apdex, app.host);
    for (let y = 0; y < app.host.length; y++) {
      let host = app.host[y];

      if (hosts[host]) {
        hosts[host].addApp(newApp);
      } else {
        let newHost = new Host(host);
        newHost.addApp(newApp);
        hosts[host] = newHost;
      }
    }
  }
  return hosts;
}