import { Request } from "express";

export type RequestType = Request & {
  token?: { id: string | number };
};
