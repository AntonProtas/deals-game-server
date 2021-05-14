import httpStatusCodes from 'http-status-codes';

const errorsHandler = async (error, req, res, next) => {
  console.error(error);

  res.status(error.status || httpStatusCodes.INTERNAL_SERVER_ERROR).send({
    error: {
      status: error.status || httpStatusCodes.INTERNAL_SERVER_ERROR,
      message: error.message || 'Internal Server Error'
    }
  });
};

export { errorsHandler };
