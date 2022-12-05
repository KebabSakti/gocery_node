import admin from "firebase-admin";
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import AuthRepository from "../../usecase/repository/auth_repository";

class AuthFirebase implements AuthRepository {
  async show(token: string): Promise<string | null> {
    const decodedToken: DecodedIdToken = await admin
      .auth()
      .verifyIdToken(token);

    if (decodedToken == undefined) {
      throw new Error("Auth token invalid");
    }

    return decodedToken.uid;
  }
}

export default AuthFirebase;
