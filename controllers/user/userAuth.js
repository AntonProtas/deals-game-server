import httpStatusCodes from 'http-status-codes';
import createError from 'http-errors';
import * as yup from 'yup';
import jwt from 'jsonwebtoken';

//models
import User from '../../models/User.js';

//env
import { SECRET } from '../../env-dev.js';

export const schemaUserAuth = yup.object({
  email: yup.string().email().required(),
  password: yup
    .string()
    .required('no password provided.')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
});

const userAuth = async (req, res, next) => {
  try {
    const { password, email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      throw createError(httpStatusCodes.NOT_FOUND, 'user not found');
    }

    const passwordIsMatch = await user.comparePasswords(password);

    if (!passwordIsMatch) {
      throw createError(
        httpStatusCodes.FORBIDDEN,
        'password or email does not match'
      );
    }

    if (user && passwordIsMatch) {
      const token = jwt.sign(
        {
          id: user._id,
          nickname: user.nickname,
          email: user.email,
          balance: user.balance
        },
        SECRET
      );

      res.status(httpStatusCodes.OK);
      res.json({
        token
      });
    }
  } catch (error) {
    next(error);
  }
};

export default userAuth;
