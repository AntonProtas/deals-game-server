import httpStatusCodes from 'http-status-codes';
import createError from 'http-errors';

import * as yup from 'yup';

import { getIconsByName } from '../../services/nounIconsService.js';

export const schemaIconsGet = yup.object({
  q: yup.string()
});

const iconsGet = async (req, res, next) => {
  try {
    const icons = await getIconsByName().then((data) =>
      data.map((x) => x?.preview_url ?? '')
    );

    res.status(httpStatusCodes.OK);
    res.json({ icons: icons || [] });
  } catch (error) {
    throw createError(httpStatusCodes.BAD_REQUEST);
  }
};

export default iconsGet;
