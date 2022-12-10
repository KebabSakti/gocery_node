import { Unauthorized } from "./../../../../../core/config/errors";
import jwt from "jsonwebtoken";
import AuthContract from "../../entity/contract/auth_contract";

class AuthJwt implements AuthContract {
  async verify(token: string): Promise<string | null> {
    return await new Promise<string | null>((resolve, reject) => {
      jwt.verify(
        token,
        process.env.JWT_TOKEN as string,
        (error: any, payload: any) => {
          if (payload != undefined) {
            resolve(payload._id);
          }

          reject(new Unauthorized(error?.message));
        }
      );
    });
  }

  async access(_id: string): Promise<string | null> {
    return await new Promise<string | null>((resolve) => {
      const token = jwt.sign({ _id: _id }, process.env.JWT_TOKEN as string, {
        expiresIn: "100 years",
      });

      resolve(token);
    });
  }
}

export default AuthJwt;
