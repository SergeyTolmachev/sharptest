module.exports = (error, req, res, next) => {
  const {
    name, errors, message, index 
  } = error;
  if (name === 'SequelizeValidationError' || name === 'SequelizeUniqueConstraintError') {
    const resultErrors = {};
    errors.forEach((error) => {
      if (!resultErrors[error.path]) {
        let { message } = error;

        if (message.indexOf('cannot be null') !== -1) {
          message = 'Required field';
        }

        resultErrors[error.path] = message;
      }
    });

    return res.status(400).json(resultErrors);
  }

  if (name === 'SequelizeForeignKeyConstraintError') {
    return res.status(400).json({
      [index]: 'Invalid value'
    });
  }

  return res.status(500).json({ _error: message });
};
