import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET || "secret";

const issue = (payload: any) => jwt.sign(payload, secret);
const verify = (token: string) => jwt.verify(token, secret);

export default {
  issue,
  verify,
};
