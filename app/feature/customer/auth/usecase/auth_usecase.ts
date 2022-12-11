import AuthContract from "../entity/contract/auth_contract";

class AuthUsecase<T, S> {
  private auth: AuthContract<T, S>;

  constructor(auth: AuthContract<T, S>) {
    this.auth = auth;
  }

  verify(param: any): T {
    return this.auth.verify(param);
  }

  access(param: any): S {
    return this.auth.access(param);
  }
}

export default AuthUsecase;
