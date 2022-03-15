import { Response } from "express";
import { RequestType } from "../types";
import JWTService from "../services/auth.service";

// usually: "Authorization: Bearer [token]" or "token: [token]"
const authPolicy = (req: RequestType, res: Response, next: any) => {
  let tokenToVerify;

  if (req.header("Authorization")) {
    const parts = req.header("Authorization")?.split(" ");

    if (parts?.length === 2) {
      const scheme = parts[0];
      const credentials = parts[1];

      if (/^Bearer$/.test(scheme)) {
        tokenToVerify = credentials;
      } else {
        return res
          .status(401)
          .json({ msg: "Format for Authorization: Bearer [token]" });
      }
    } else {
      return res
        .status(401)
        .json({ msg: "Format for Authorization: Bearer [token]" });
    }
  } else if (req.body.token) {
    console.log(req.body.token);
    tokenToVerify = req.body.token;
    delete req.query.token;
  } else {
    return res.status(401).json({ msg: "No Authorization was found" });
  }
  let token;
  try {
    token = JWTService.verify(tokenToVerify) as string;
  } catch (err) {
    return res.status(401).json({ err });
  }
  req.token = JSON.parse(token);
  return next();
};

export default authPolicy;
