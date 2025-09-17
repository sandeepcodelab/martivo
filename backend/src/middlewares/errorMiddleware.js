import { ApiError } from "../utils/apiError.js";

export const globleErrorHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    return res
      .status(err.statusCode)
      .json({ success: false, message: err.message, errors: err.errors || [] });
  }

  console.log(err);

  return res
    .status(500)
    .json({ success: false, message: "Internal server error", errors: [] });
};
