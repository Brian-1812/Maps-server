import { Response } from "express";
import { RequestType } from "../types";
import JWTService from "../services/auth.service";
import User from "../models/User";

// usually: "Authorization: Bearer [token]" or "token: [token]"
const adminAuth = async (req: RequestType, res: Response, next: any) => {
  let tokenToVerify;

  if (req.header("Authorization")) {
    const parts = req.get("Authorization")?.split(" ");

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
  const tokenParsed = JSON.parse(token);
  const { id } = tokenParsed;
  try {
    const user: any = await User.findByPk(id);
    if (!user) return res.status(401).json({ msg: "No such user!" });
    if (user?.role !== "admin")
      return res.status(401).json({ msg: "Access denied!" });
    req.token = tokenParsed;
    return next();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Some error occured" });
  }
};

export default adminAuth;
