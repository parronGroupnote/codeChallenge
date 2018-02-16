
import GetTopAppsByHostUseCase from './GetTopAppsByHostUseCase';
import MemoryDataRepository from '../../Data/MemoryDataRepository';
import Host from '../../Common/Host';
import App from '../../Common/App';

import { expect } from 'chai';

describe('GetTopAppsByHostUseCase', () => {
  const DR = new MemoryDataRepository();
  const GetUseCase = new GetTopAppsByHostUseCase(DR);
  const hosts = DR.getHosts();

  it('should return an array (App)', () => {
    const hostExample = hosts[Object.keys(hosts)[0]];
    expect(hostExample).to.be.an.instanceOf(Host)

    const result = GetUseCase.run(hostExample);
    expect(result).to.satisfy(Array)
    expect(result[0]).to.be.an.instanceOf(App);

  });

  it('should return 25 apps', () => {
    const hostExample = hosts[Object.keys(hosts)[0]];
    expect(hostExample).to.be.an.instanceOf(Host)

    const result = GetUseCase.run(hostExample);
    expect(result.length).to.eql(25);
  });
});