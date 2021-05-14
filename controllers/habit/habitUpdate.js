import httpStatusCodes from 'http-status-codes';
import createError from 'http-errors';
import * as yup from 'yup';
import isEmpty from 'lodash/isEmpty.js';
import omitBy from 'lodash/omitBy.js';
import isNil from 'lodash/isNil.js';

//models
import Habit from '../../models/Habit.js';

export const schemaHabitUpdate = yup.object({
  title: yup.string(),
  description: yup.string(),
  award: yup.number(),
  price: yup.number()
});

const habitUpdate = async (req, res, next) => {
  try {
    const { id: habitId } = req.params;
    const { id: userId } = req.user;
    const { title, description, award, price } = req.body;

    const habit = await Habit.findById(habitId);

    if (!habit || habit.user_id.toString() !== userId) {
      next(createError(httpStatusCodes.CONFLICT, 'habit not updated'));
    } else {
      const updateFields = omitBy(
        {
          title,
          description,
          award: habit.is_helpful ? award : null,
          price: !habit.is_helpful ? price : null
        },
        isNil
      );

      if (isEmpty(updateFields)) {
        next(
          createError(httpStatusCodes.CONFLICT, 'not provided update fields')
        );
      } else {
        console.log(updateFields);

        const updatedHabit = await Habit.findByIdAndUpdate(
          habitId,
          updateFields,
          {
            new: true
          }
        );

        res.status(httpStatusCodes.OK);
        res.json(updatedHabit);
      }
    }
  } catch (error) {
    next(error);
  }
};

export default habitUpdate;
