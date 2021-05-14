import httpStatusCodes from 'http-status-codes';
import createError from 'http-errors';
import { cloudinaryConfig } from '../env-dev.js';
import cloudinaryService from 'cloudinary';
import streamifier from 'streamifier';

const cloudinary = cloudinaryService.v2;

cloudinary.config({
  ...cloudinaryConfig
});

export const uploadImageToCloudinary = (image) => {
  try {
    return new Promise((resolve, reject) => {
      const cld_upload_stream = cloudinary.uploader.upload_stream(
        {},
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );

      streamifier.createReadStream(image.data).pipe(cld_upload_stream);
    });
  } catch (error) {
    throw createError(
      httpStatusCodes.INTERNAL_SERVER_ERROR,
      'cloudinary error'
    );
  }
};
