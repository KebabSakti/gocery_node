import admin from "firebase-admin";
import firebaseCredential from "../config/ayo-belanja-7bc1e-firebase-adminsdk-pxpmr-cacdd5bcd3.json";

class FirebaseAdmin {
  static init() {
    admin.initializeApp({
      credential: admin.credential.cert(
        firebaseCredential as admin.ServiceAccount
      ),
      databaseURL: "https://ayo-belanja-7bc1e.firebaseio.com",
    });
  }
}

export default FirebaseAdmin;
