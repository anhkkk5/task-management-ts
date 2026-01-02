import { taskRouter } from "./task.route";
import { Express } from "express";
import { userRouter } from "./user.route";
import { requireAuth } from "../middlewares/auth.middleware";

const mainV1Routes = (app: Express): void => {
  const version = "/api/v1";
  app.use(version + "/tasks", requireAuth, taskRouter);
  app.use(version + "/users", userRouter);
};

export default mainV1Routes;
