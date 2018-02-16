
import Host, { radixSortLSD } from './Host';
import App from './App';

import { expect } from 'chai';

describe('Host', () => {

  const testHost = new Host("test")

  it('should be a Host', () => {
    expect(testHost).to.be.an.instanceOf(Host);
  })

  it('should have property id', () => {
    expect(testHost).to.have.ownProperty('id')
  });

  it('should have property apps', () => {
    expect(testHost).to.have.ownProperty('apps')
  });

  it('getId should return id (string)', () => {
    const id = testHost.getId();
    expect(id).to.eql('test')
    expect(id).to.be.string;
  });

  it('addApp should add app', () => {
    const app = new App('test', [], 1, 30, ['test']);
    testHost.addApp(app)
    expect(testHost.getApps()).to.have.length(1);
  });

  it('addApp should add app unordered', () => {
    const app2 = new App('test', [], 1, 3, ['test']);

    testHost.addApp(app2)

    const apps = testHost.getApps()
    expect(apps[1].getApdex()).to.eql(3);
  });

  it('getApps should return apps unordered', () => {
    const app3 = new App('test', [], 1, 50, ['test']);
    testHost.addApp(app3)

    const apps = testHost.getApps()
    expect(apps[0].getApdex()).to.eql(30);
    expect(apps[1].getApdex()).to.eql(3);
    expect(apps[2].getApdex()).to.eql(50);
    expect(apps.length).to.eql(3);
  })

  it('getTopApps should order and return especified number', () => {
    const apps = testHost.getTopApps(5)
    expect(apps[0].getApdex()).to.eql(50);
    expect(apps[1].getApdex()).to.eql(30);
    expect(apps[2].getApdex()).to.eql(3);
  })

  it('getTopApps should return especified number if there are enough', () => {
    const apps = testHost.getTopApps(5);
    expect(apps.length).to.eql(3);

    const apps2 = testHost.getTopApps(3)
    expect(apps.length).to.eql(3);
  })

  it('addAppSorted should insert sorted', () => {
    const app4 = new App('test', [], 1, 60, ['test']);
    testHost.addAppSorted(app4);
    const topApp = testHost.getApps()[0];
    expect(topApp.getApdex()).to.eql(60);
  })

  it('removeApp should remove app', () => {
    const app5 = new App('test', [], 1, 65, ['test']);
    testHost.addAppSorted(app5);

    const topApp = testHost.getApps()[0];
    expect(topApp).to.eql(app5);

    testHost.removeApp(app5);
    const topApp2 = testHost.getApps()[0];
    expect(topApp2).to.not.eql(app5);
  })

  it('radixSortLSD should sort array of apps', () => {
    const app1 = new App('test', [], 1, 65, ['test']);
    const app2 = new App('test', [], 1, 3, ['test']);
    const app3 = new App('test', [], 1, 5, ['test']);
    const app4 = new App('test', [], 1, 1, ['test']);
    const app5 = new App('test', [], 1, 80, ['test']);

    const host = []

    host.push(app1);
    host.push(app2);
    host.push(app3);
    host.push(app4);
    host.push(app5);

    expect(host[0]).to.eql(app1);

    const sortedArray = radixSortLSD(host);
    expect(host[0]).to.eql(app5);
  })
});