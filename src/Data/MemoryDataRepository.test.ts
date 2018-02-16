import MemoryDataRepository from './MemoryDataRepository';
import DataRepository from './DataRepository';
import Host from '../Common/Host';

import { expect } from 'chai';

describe('MemoryDataRepository', () => {
  const DR = new MemoryDataRepository();

  it('should have property hosts', () => {
    expect(DR).to.have.ownProperty('hosts')
  });

  it('should have property initialized', () => {
    expect(DR).to.have.ownProperty('initialized')
  });

  it('getHosts should return object (Host)', () => {
    const result = DR.getHosts();
    expect(result).to.be.an.instanceOf(Object)
    expect(result[Object.keys(result)[0]]).to.be.an.instanceOf(Host)
  });
});