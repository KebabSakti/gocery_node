import admin from "firebase-admin";
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import { AuthRepository } from "../repository/auth_repository";
import { Unauthorized } from "../../../../core/config/errors";

class AuthFirebase implements AuthRepository {
  async verify(token: string): Promise<string> {
    try {
      const decodedToken: DecodedIdToken = await admin
        .auth()
        .verifyIdToken(token);

      if (decodedToken == undefined) {
        throw new Unauthorized("Auth token invalid");
      }

      return decodedToken.uid;
    } catch (e: any) {
      throw new Unauthorized(e.message);
    }
  }
}

export default AuthFirebase;
