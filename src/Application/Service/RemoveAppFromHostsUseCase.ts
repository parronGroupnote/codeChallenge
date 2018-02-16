
import DataRepository from '../../Data/DataRepository';
import Host from '../../Common/Host';
import App from '../../Common/App';
import BadImplementationException from '../../Exceptions/BadImplementationExcetion';

export default class RemoveAppFromHostsUseCase {
  private DR: DataRepository;

  public constructor(DR: DataRepository) {
    this.DR = DR;
  }

  public run(hosts: Host[], app: App) {
    try {
      const hostsDR = this.DR.getHosts();

      for (let x = 0; x < hosts.length; x++) {
        hostsDR[hosts[x].getId()].removeApp(app)
      }

    } catch (e) {
      const error = new BadImplementationException('RemoveAppFromHostsUseCase')
      throw error.getMessage();
    }
  }
}