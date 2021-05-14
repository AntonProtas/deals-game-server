import httpStatusCodes from 'http-status-codes';
import createError from 'http-errors';
import * as yup from 'yup';
import jwt from 'jsonwebtoken';

//models
import User from '../../models/User.js';

//env
import { SECRET } from '../../env-dev.js';

export const schemaUserCreate = yup.object({
  nickname: yup.string().required(),
  email: yup.string().email().required(),
  password: yup
    .string()
    .required('no password provided.')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
});

const userCreate = async (req, res, next) => {
  try {
    const { nickname, email, password } = req.body;

    const user = new User({ nickname, email, password });

    const createdUser = await user.save();

    console.log(createdUser);

    const token = jwt.sign(
      {
        id: createdUser._id,
        nickname: createdUser.nickname,
        email: createdUser.email,
        balance: createdUser.balance
      },
      SECRET
    );

    res.status(httpStatusCodes.CREATED);
    res.json({
      token
    });
  } catch (error) {
    if (error.code === 11000) {
      console.error(error);

      next(
        createError(
          httpStatusCodes.CONFLICT,
          `${Object.keys(error.keyPattern)} must be unique`
        )
      );
    }

    next(createError(httpStatusCodes.CONFLICT, 'user not created'));
  }
};

export default userCreate;
