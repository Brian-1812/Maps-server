import createSocket from "./socket";
import useMiddlewares from "./useMiddlewares";

const config = {
  migrate: false,
  port: process.env.PORT || "2022",
  createSocket,
  useMiddlewares,
};

export default config;
