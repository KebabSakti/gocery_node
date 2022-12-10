abstract class AuthContract {
  abstract verify(token: string): Promise<string | null>;

  abstract access(_id: string): Promise<string | null>;
}

export default AuthContract;
