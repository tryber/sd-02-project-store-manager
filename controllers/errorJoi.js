const errorJoi = (err) => {
  if (err.details) {
    return {
      error: true,
      message: err.details[0].message,
      code: 'invalid_data',
    };
  }
  return err;
};

module.exports = errorJoi;
