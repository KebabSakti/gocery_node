import mongoose from "mongoose";

class MongoDB {
  static connect() {
    try {
      const host = "mongodb";
      const user = "root";
      const password = "buyung";

      mongoose.connect(`mongodb://${user}:${password}@${host}`, {
        autoIndex: false,
      });
    } catch (e) {
      console.log(e);
    }
  }
}

export default MongoDB;
