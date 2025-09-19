import { ApiError } from "../utils/apiError.js";

export const roleCheck = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new ApiError(
        403,
        "Access denied: You do not have administrator privileges.",
        []
      );
    }

    next();
  };
};
