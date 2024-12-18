export abstract class ApiContext {

  public readonly BASE_URL = 'http://localhost:8080/';

  public readonly api = {
    auth:'auth',
    permissions:'permissions',
    api:'api'
  }
}
