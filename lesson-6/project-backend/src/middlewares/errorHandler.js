import {HttpError} from "http-errors";

const errorHanlder = (error, req, res, next) => {
  if (error instanceof HttpError) {
    const { status, message } = error;
    return res.status(status).json({
      message,
    });
  }

  const isProd = process.env.NODE_ENV === "production";
  const message = isProd ? "Some error" : error.message;
  const status = isProd ? 500 : (error.status || 500);

  res.status(status).json({
    message,
  });
}

export default errorHanlder;
