
import AddAppToHostsUseCase from './AddAppToHostsUseCase';
import GetTopAppsByHostUseCase from './GetTopAppsByHostUseCase';
import MemoryDataRepository from '../../Data/MemoryDataRepository';
import Host from '../../Common/Host';
import App from '../../Common/App';

import { expect } from 'chai';

describe('AddAppToHostsUseCase', () => {
  const DR = new MemoryDataRepository();
  const AddUseCase = new AddAppToHostsUseCase(DR);
  const hosts = DR.getHosts();

  it('should add to Hosts', () => {
    const hostExample = hosts[Object.keys(hosts)[0]];

    const appExample = new App('test', [], 1, 90, []);
    AddUseCase.run([hostExample], appExample);

    const newApps = hostExample.getApps()
    expect(newApps).to.include(appExample);
  });

  it('should add to more than 1 Host', () => {
    const hostExample = hosts[Object.keys(hosts)[0]];
    const hostExample2 = hosts[Object.keys(hosts)[1]];

    const appExample = new App('test', [], 1, 90, []);
    AddUseCase.run([hostExample, hostExample2], appExample);

    const newApps = hostExample.getApps()
    expect(newApps).to.include(appExample);

    const newApps2 = hostExample2.getApps()
    expect(newApps2).to.include(appExample);

  });
});