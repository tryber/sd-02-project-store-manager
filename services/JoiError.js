const JoiError = (err) => {
  if (err.details) {
    return { error: { message: err.details[0].message, code: 'invalid_data' } };
  }
  return err;
};

module.exports = JoiError;
