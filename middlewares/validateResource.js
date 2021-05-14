import createError from 'http-errors';
import httpStatusCodes from 'http-status-codes';

export const validateResource = (resourceSchema) => async (req, res, next) => {
  const resource = req.method === 'GET' ? req.query : req.body;

  try {
    await resourceSchema.validate(resource);

    next();
  } catch (error) {
    next(createError(httpStatusCodes.FORBIDDEN, error.errors.join(', ')));
  }
};
