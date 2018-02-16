
import App from './App';

import { expect } from 'chai';

describe('App', () => {

  const testApp = new App('test', [], 1, 30, ['test']);

  it('should be an App', () => {
    expect(testApp).to.be.an.instanceOf(App);
  })

  it('should have property name', () => {
    expect(testApp).to.have.ownProperty('name')
  });

  it('should have property contributors', () => {
    expect(testApp).to.have.ownProperty('contributors')
  });

  it('should have property version', () => {
    expect(testApp).to.have.ownProperty('version')
  });

  it('should have property apdex', () => {
    expect(testApp).to.have.ownProperty('apdex')
  });

  it('should have property host', () => {
    expect(testApp).to.have.ownProperty('host')
  });

  it('getVersion should return version (number)', () => {
    const version = testApp.getVersion();
    expect(version).to.eql(1)
    expect(version).to.satisfy(Number);
  });

  it('getName should return name (string)', () => {
    const name = testApp.getName();
    expect(name).to.eql('test')
    expect(name).to.be.string;
  });

  it('getApdex should return name (string)', () => {
    const apdex = testApp.getApdex();
    expect(apdex).to.eql(30)
    expect(apdex).to.satisfy(Number);
  });

  it('version should be > 0 and < 100', () => {
    function createApp() {
      new App('test', [], 1, -3, ['test'])
    }
    expect(createApp).to.throw('App setApdex - Bad implementation')
  });

});