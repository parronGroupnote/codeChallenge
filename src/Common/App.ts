import BadImplementationException from '../Exceptions/BadImplementationExcetion';

export default class App {
  private name;
  private contributors;
  private version;
  private apdex;
  private host;

  constructor(name: string, contributors: string[], version: number, apdex: number, host: string[]) {
    this.name = name;
    this.contributors = contributors;
    this.version = version;
    this.apdex = this.setApdex(apdex);
    this.host = host;
  }

  private setApdex(apdex: number) {
    if(apdex > 100 || apdex < 0){
      const error = new BadImplementationException('App setApdex')
      throw error.getMessage()
    }
    return apdex
  }

  public getVersion() {
    return this.version
  }

  public getName() {
    return this.name;
  }

  public getApdex() {
    return this.apdex;
  }
}
