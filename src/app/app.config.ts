export class AppConfig {

  public static JWT_CONFIG = {
    headerName: 'Authorization',
    headerPrefix: 'Bearer',
    tokenName: 'token',
    tokenGetter: (() => {
      let token = localStorage.getItem('token');
      if (!token) {
        token = sessionStorage.getItem('token');
      }
      return token;
    }),
    globalHeaders: [{'Content-Type':'application/json'}],
    noJwtError: true,
    noTokenScheme: true
  };
}