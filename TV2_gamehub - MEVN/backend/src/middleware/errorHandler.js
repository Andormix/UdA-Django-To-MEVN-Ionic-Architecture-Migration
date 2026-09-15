function errorHandler(error, req, res, next) {
  console.error(error);

  if (error.name === "ValidationError") {
    return res.status(400).json({ message: "Validation error", details: error.message });
  }

  if (error.code === 11000) {
    return res.status(409).json({ message: "Duplicated value" });
  }

  return res.status(500).json({ message: "Internal server error" });
}

module.exports = { errorHandler };
