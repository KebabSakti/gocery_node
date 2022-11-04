import admin from "firebase-admin";
import firebaseCredential from "../config/ayo-belanja-7bc1e-firebase-adminsdk-pxpmr-cacdd5bcd3.json";
import { DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import AuthRepository from "../repository/auth_repository";
import { Unauthorized } from "../../../../core/config/errors";

admin.initializeApp({
  credential: admin.credential.cert(firebaseCredential as admin.ServiceAccount),
  databaseURL: "https://ayo-belanja-7bc1e.firebaseio.com",
});

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
