const createError = (status, message) => {
  const err = new Error();
  err.status = status;
  err.message = message;
  return err;
};
export const handleErrors = (err, req, res, next) => {
  // Error handling logic here
  res.status(500).json({ error: "Internal server error" });
};
export default createError;
