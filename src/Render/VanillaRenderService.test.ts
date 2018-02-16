import VanillaRenderService from './VanillaRenderService';
import MemoryDataRepository from '../Data/MemoryDataRepository';

import { expect } from 'chai';

require('jsdom-global')()

describe('VanillaRenderService', () => {
  const Renderer = new VanillaRenderService();
  const DR = new MemoryDataRepository();
  let hosts = DR.getHosts()

  let sceneContainer = document.createElement('div')
  sceneContainer.id = 'scene';
  document.body.appendChild(sceneContainer);
  Renderer.renderScene(hosts);

  it('scene should have header and hostList', () => {
    const scene = document.getElementById('scene')
    expect(scene.children.length).to.equal(2)
    expect(scene.children[0].id).to.eql('header')
    expect(scene.children[1].id).to.eql('hostList')
  });

  it('header should have title', () => {
    const header = document.getElementById('header');
    expect(header.children[0]).to.satisfy(String);
    expect(header.children[0].className).to.equal('title');
  });

  it('header should have subtitle', () => {
    const header = document.getElementById('header');
    expect(header.children[1]).to.satisfy(String);
    expect(header.children[1].className).to.equal('subtitle');
  });

  it('header should have checkbox', () => {
    const header = document.getElementById('header');
    expect(header.children[2].nodeName.toLowerCase()).to.equal('input')
    expect(header.children[2].className).to.equal('checkbox')
  });

  it('header checkbox clicked should add "single" classname to hostList', () => {
    const header = document.getElementById('header');
    let checkbox: HTMLElement = document.getElementsByClassName('checkbox')[0] as HTMLElement;
    checkbox.click();

    const hostList = document.getElementById('hostList');
    expect(hostList.className).to.equal('single')
  });

  it('header checkbox unclicked should add "double" classname to hostList', () => {
    const header = document.getElementById('header');
    
    let checkbox: HTMLElement = document.getElementsByClassName('checkbox')[0] as HTMLElement;
    checkbox.click();

    const hostList = document.getElementById('hostList');
    expect(hostList.className).to.equal('double')
  });

  it('hostList should have rows', () => {
    const hostList = document.getElementById('hostList');
    expect(hostList.children.length).to.be.at.least(1)
  });

  it('a row should have a box', () => {
    const row = document.getElementsByClassName('row')[0];
    expect(row.children[0].className).to.equal('box')
  });

  it('a row should have 2 boxes', () => {
    const row = document.getElementsByClassName('row')[0];
    expect(row.children.length).to.equal(2)
  });

  it('a box should have a title and a list', () => {
    const box = document.getElementsByClassName('box')[0];
    expect(box.children[0].className).to.equal('title');
    expect(box.children[1].nodeName.toLowerCase()).to.equal('ul')
  });

  it('a box list should contain app items', () => {
    const box = document.getElementsByClassName('box')[0];
    expect(box.children[1].children.length).to.be.at.least(1)
    expect(box.children[1].children[0].className).to.equal('app')
  });

  it('an app item should contain text', () => {
    const app = document.getElementsByClassName('app')[0];
    expect(app.children[0]).to.satisfy(String);
  });

  it('an app item should contain attribute apdex number (String in browser)', () => {
    const app = document.getElementsByClassName('app')[0];
    expect(app.children[0].attributes['apdex']).to.satisfy(String);
  });
});