import { CorsOptions } from "cors";

export const createCorsOptions = (origins: string[]): CorsOptions => {
  return {
    origin: origins,
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 200,
    credentials: true,
  };
};
