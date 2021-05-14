import httpStatusCodes from 'http-status-codes';
import createError from 'http-errors';
import jwt from 'jsonwebtoken';

//env
import { SECRET } from '../env-dev.js';

export const checkAuthorization = async (req, res, next) => {
  try {
    const token = req.headers?.token;

    const decoded = jwt.verify(token, SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    next(createError(httpStatusCodes.UNAUTHORIZED, 'unauthorized'));
  }
};
