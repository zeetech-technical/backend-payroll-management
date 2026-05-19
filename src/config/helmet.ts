import { HelmetOptions } from "helmet";

export const createHelmetConfig = (data: {
  origins: string[];
  isProduction: boolean;
}): Readonly<HelmetOptions> => {
  return {
    hsts: data.isProduction
      ? { maxAge: 63072000, includeSubDomains: true, preload: true }
      : false,
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:"],
        connectSrc: ["'self'", ...data.origins],
      },
    },
    crossOriginEmbedderPolicy: false,
  };
};
