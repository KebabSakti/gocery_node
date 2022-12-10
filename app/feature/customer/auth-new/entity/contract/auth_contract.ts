abstract class AuthContract<T, S> {
  abstract verify(param: any): T;

  abstract access(param: any): S;
}

export default AuthContract;
