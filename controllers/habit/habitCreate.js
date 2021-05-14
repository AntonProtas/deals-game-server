import httpStatusCodes from 'http-status-codes';
import createError from 'http-errors';
import * as yup from 'yup';
import isNil from 'lodash/isNil.js';
import omitBy from 'lodash/omitBy.js';
import set from 'lodash/set.js';

//models
import Habit from '../../models/Habit.js';

//services
import { uploadImageToCloudinary } from '../../services/cloudinary.js';

export const schemaHabitCreate = yup.object({
  title: yup.string().required(),
  description: yup.string(),
  award: yup.number(),
  price: yup.number(),
  is_helpful: yup.boolean()
});

const habitCreate = async (req, res, next) => {
  try {
    const {
      title,
      description,
      award = 0,
      price = 0,
      is_helpful: isHelpful = true
    } = req.body;

    const image = req.files?.image;

    const habit = new Habit(      
      omitBy(
        {
          title,
          is_helpful: isHelpful,
          description,
          award: isHelpful ? award : null,
          price: !isHelpful ? price : null,
          user_id: req.user.id
        },
        isNil
      )
    );

    if (image) {
      const uploadedImage = await uploadImageToCloudinary(image);

      set(habit, 'image_url', uploadedImage.url);
    }

    const createdHabit = await habit.save();

    res.status(httpStatusCodes.CREATED);
    res.json(createdHabit);
  } catch (error) {
    next(createError(httpStatusCodes.CONFLICT, 'habit not created'));
  }
};

export default habitCreate;
