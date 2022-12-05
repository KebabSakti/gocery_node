abstract class AuthRepository {
  abstract show(token: string): Promise<string | null>;
}

export default AuthRepository;
