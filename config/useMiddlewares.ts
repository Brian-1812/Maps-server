import { Application, json, urlencoded } from "express";
import helmet from "helmet";
import cors from "cors";
import routes from "../api/routes";
import auth from "../api/policies/auth.policy";
import adminAuth from "../api/policies/admin.policy";
import upload from "../api/services/upload.service";

const useMiddlewares = (app: Application) => {
  app.use(
    helmet({
      dnsPrefetchControl: false,
      frameguard: false,
      ieNoOpen: false,
    })
  );
  app.use(urlencoded({ extended: false }));
  app.use(json());
  app.use(cors());

  // secure your private routes with jwt authentication middleware
  app.all("/api/private/*", auth);
  app.all("/api/admin/*", adminAuth);
  app.all("/api/private/locations/create", upload.single("file"));

  // fill routes for express application
  app.use("/api/public", routes.publicRoutes);
  app.use("/api/private", routes.privateRoutes);
  app.use("/api/admin", routes.adminRoutes);
};

export default useMiddlewares;
