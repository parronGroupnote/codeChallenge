
import DataRepository from '../../Data/DataRepository';
import Host from '../../Common/Host';
import BadImplementationException from '../../Exceptions/BadImplementationExcetion';

export default class GetTopAppsByHostUseCase {
  private DR: DataRepository;

  public constructor(DR: DataRepository) {
    this.DR = DR;
  }

  public run(host: Host) {
    try {
      const hosts = this.DR.getHosts();

      const apps = hosts[host.getId()].getTopApps(25)

      return apps;
    } catch (e) {
      const error = new BadImplementationException('GetTopAppsByHostUseCase')
      throw error.getMessage();
    }
  }
}