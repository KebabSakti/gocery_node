abstract class AuthRepository {
  abstract verify(token: string): Promise<string>;
}

export default AuthRepository;
