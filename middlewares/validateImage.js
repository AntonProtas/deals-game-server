import createError from 'http-errors';
import httpStatusCodes from 'http-status-codes';

const allowMimeTypes = ['image/jpeg', 'image/gif', 'image/png'];
const maxSize = 2000000;

export const validateImage = (req, res, next) => {
  try {
    const image = req.files?.image;

    if (image) {
      const isAllowType = allowMimeTypes.includes(image?.mimetype);

      if (!isAllowType) {
        throw createError(
          httpStatusCodes.UNPROCESSABLE_ENTITY,
          'incorrect file type'
        );
      }

      const isAllowSize = image?.size < maxSize;

      if (!isAllowSize) {
        throw createError(
          httpStatusCodes.UNPROCESSABLE_ENTITY,
          'file size exceeded'
        );
      }
    }

    next();
  } catch (error) {
    next(error);
  }
};
