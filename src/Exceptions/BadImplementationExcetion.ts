
import Exception from './Exception';

// Generic exception for simplicity
export default class BadImplementationExcetion implements Exception {
  private value; 

  public constructor(value: string) {
    this.value = value
  }

  public getMessage() {
    return `${this.value} - Bad implementation`;
  }
}
