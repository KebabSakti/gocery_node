export abstract class AuthRepository {
  abstract verify(token: string): Promise<string>;
}

export abstract class AuthRepositoryJwt extends AuthRepository {
  abstract sign(id: string): Promise<void>;
}
