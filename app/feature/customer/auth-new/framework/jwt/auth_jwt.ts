import jwt from "jsonwebtoken";
import AuthContract from "../../entity/contract/auth_contract";
import { Unauthorized } from "./../../../../../core/config/errors";

class AuthJwt implements AuthContract<Promise<string>, string> {
  async verify(token: string): Promise<string> {
    return await new Promise<string>((resolve, reject) => {
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

  access(_id: string): string {
    const token = jwt.sign({ _id: _id }, process.env.JWT_TOKEN as string, {
      expiresIn: "100 years",
    });

    return token;
  }
}

export default AuthJwt;
