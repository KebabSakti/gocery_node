import admin from "firebase-admin";
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import { AuthRepositoryJwt } from "../repository/auth_repository";
import { Unauthorized } from "../../../../core/config/errors";

class AuthJwt implements AuthRepositoryJwt {
  async sign(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

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

export default AuthJwt;
