
import RemoveAppFromHostsUseCase from './RemoveAppFromHostsUseCase';
import GetTopAppsByHostUseCase from './GetTopAppsByHostUseCase';
import MemoryDataRepository from '../../Data/MemoryDataRepository';
import Host from '../../Common/Host';
import App from '../../Common/App';

import { expect } from 'chai';

describe('RemoveAppFromHostsUseCase', () => {
  const DR = new MemoryDataRepository();
  const RemoveUseCase = new RemoveAppFromHostsUseCase(DR);
  const hosts = DR.getHosts();

  it('should remove from Hosts', () => {
    const hostExample = hosts[Object.keys(hosts)[0]];
    const apps = hostExample.getApps();
    const appExample = apps[0]

    RemoveUseCase.run([hostExample], appExample);

    const newApps = hostExample.getApps()
    expect(newApps[0]).to.not.eql(appExample);
  });

  it('should remove from more than 1 Host', () => {
    const hostExample = hosts[Object.keys(hosts)[0]];
    const hostExample2 = hosts[Object.keys(hosts)[1]];
    const apps = hostExample.getApps();
    const appExample = apps[0]

    RemoveUseCase.run([hostExample], appExample);

    const newApps = hostExample.getApps()
    expect(newApps[0]).to.not.eql(appExample);

    const newApps2 = hostExample2.getApps()
    expect(newApps2[0]).to.not.eql(appExample);

  });

  it('should remove and getTopAppsByHost should return 25 apps (App)', () => {
    const hostExample = hosts[Object.keys(hosts)[0]];
    const apps = hostExample.getTopApps(25);
    expect(apps.length).to.eql(25);

    const appExample = apps[0]
    RemoveUseCase.run([hostExample], appExample);

    const newApps = hostExample.getApps()
    expect(newApps[0]).to.not.eql(appExample);

    const GetUseCase = new GetTopAppsByHostUseCase(DR);
    const topApps = GetUseCase.run(hostExample)
    expect(topApps.length).to.equal(25);
    expect(topApps[0]).to.be.an.instanceOf(App);
  });
});