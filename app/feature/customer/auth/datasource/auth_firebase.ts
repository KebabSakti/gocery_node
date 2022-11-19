import admin from "firebase-admin";
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import { AuthRepository } from "../repository/auth_repository";
import { Unauthorized } from "../../../../core/config/errors";

class AuthFirebase implements AuthRepository {
  async verify(token: string): Promise<string> {
    const decodedToken: DecodedIdToken = await admin
      .auth()
      .verifyIdToken(token);

    if (decodedToken == undefined) {
      throw new Unauthorized("Firebase token invalid");
    }

    return decodedToken.uid;
  }
}

export default AuthFirebase;
