import express, { Application, json } from "express";
import helmet from "helmet";
import cors from "cors";

import apiRouter from "./routes/router";
import { errorHandler, responseWrapper } from "./middlewares";
import {
  envs,
  swaggerConfig,
  createHelmetConfig,
  createCorsOptions,
} from "./config";

const isProduction = envs.nodeEnv === "production";

export const app: Application = express();

app.disable("x-powered-by");
if (isProduction) {
  app.set("trust proxy", true);
}
app.use(helmet(createHelmetConfig({ origins: envs.origins, isProduction })));
app.use(cors(createCorsOptions(envs.origins)));
app.use(json());

if (!isProduction) {
  app.use(swaggerConfig);
}
app.use(responseWrapper);
app.use("/api/v1", apiRouter);
app.use(errorHandler);
