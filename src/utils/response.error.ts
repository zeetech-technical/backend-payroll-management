import logger from "./logger";

type IERRORS_CUSTOM =
  | "INVALID_CREDENTIALS"
  | "NOT_TOKEN_PROVIDED"
  | "TOKEN_EXPIRED"
  | "SESSION_REVOKED"
  | "SESSION_CLOSE_REDIS"
  | "UNAUTHORIZED"
  | "TOO_MANY_REQUESTS"
  | "NOT_FOUND";

type ITINTERNAL_ERRORS =
  | "SequelizeValidationError"
  | "SequelizeDatabaseError"
  | "SequelizeUniqueConstraintError"
  | "SequelizeEagerLoadingError"
  | "ZodError"
  | "NOT_FOUND";

interface ErrorResponseShape {
  code: number;
  message: string;
  errors?: any;
}

const ERROR_RESPONSE_CUSTOM: Record<IERRORS_CUSTOM, ErrorResponseShape> = {
  INVALID_CREDENTIALS: {
    code: 401,
    message: "Invalid credentials",
  },
  NOT_TOKEN_PROVIDED: {
    code: 401,
    message: "No token provided",
  },
  TOKEN_EXPIRED: {
    code: 401,
    message: "Token expired",
  },
  SESSION_REVOKED: {
    code: 401,
    message: "Session revoked",
  },
  SESSION_CLOSE_REDIS: {
    code: 500,
    message: "Error closing session",
  },
  UNAUTHORIZED: {
    code: 401,
    message: "Unauthorized",
  },
  TOO_MANY_REQUESTS: {
    code: 429,
    message: "Too many requests",
  },
    NOT_FOUND: {
    code: 404,
    message: "Resource not found",
  },
};

const ERRORS_TO_RESPONSE: Record<
  ITINTERNAL_ERRORS,
  (err: any) => ErrorResponseShape
> = {
  SequelizeDatabaseError: (err) => ({
    code: 500,
    message: "Database error",
    errors: [err?.parent?.sqlMessage || err.message],
  }),

  SequelizeUniqueConstraintError: (err) => ({
    code: 409,
    message: "Resource already exists",
    errors: err?.errors?.map((e: any) => ({
      message: e.message,
      path: e.path,
    })),
  }),

  SequelizeEagerLoadingError: () => ({
    code: 500,
    message: "Sequelize eager loading error",
  }),

  SequelizeValidationError: (err) => ({
    code: 400,
    message: "Validation error",
    errors: err?.errors?.map((e: any) => ({
      message: e.message,
      path: e.path,
    })),
  }),

  ZodError: (err) => ({
    code: 400,
    message: "Validation error",
    errors: err?.issues?.map((i: any) => ({
      message: i.message,
      path: i.path?.[0],
    })),
  }),

  NOT_FOUND: () => ({
    code: 404,
    message: "Resource not found",
  }),
};

export const errorResponse = ({
  err,
  statusCode,
  data
}: {
  err: any;
  statusCode: number;
  data?: any;
}): ErrorResponseShape => {
  const info = err.data;
  
  // Custom errors
  if (err?.type === "custom_error" && err.code in ERROR_RESPONSE_CUSTOM) {
    const responseErros =  ERROR_RESPONSE_CUSTOM[err.code as IERRORS_CUSTOM];
    return {...responseErros, ...(info && {...info})};
  }


  const handler =ERRORS_TO_RESPONSE[err?.name as ITINTERNAL_ERRORS];

  if (handler) {
    return {...handler(err), ...(info && {...info})};
  }

  // JWT ERRORS
  if (err?.name === "TokenExpiredError") {
    return {
      code: 401,
      message: "Token expired",
    };
  }

  if (err?.name === "JsonWebTokenError") {
    return {
      code: 401,
      message: "Invalid token",
    };
  }

  logger.error(err);
  return {
    code: statusCode || 500,
    message: err?.message || "Internal Server Error",
    ...(info && {...info})
  };
};
