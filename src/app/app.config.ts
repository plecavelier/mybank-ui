export class AppConfig {

  public static JWT_CONFIG = {
    headerName: 'Authorization',
    headerPrefix: 'Bearer',
    tokenName: 'token',
    tokenGetter: (() => localStorage.getItem('token')),
    globalHeaders: [{'Content-Type':'application/json'}],
    noJwtError: true,
    noTokenScheme: true
  };
}