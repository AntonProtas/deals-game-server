import httpStatusCodes from 'http-status-codes';
import createError from 'http-errors';

//models
import Habit from '../../models/Habit.js';

const habitDelete = async (req, res, next) => {
  try {
    const { id: habitId } = req.params;
    const { id: userId } = req.user;

    const habit = await Habit.findById(habitId);

    if (!habit || habit.user_id.toString() !== userId) {
      next(createError(httpStatusCodes.CONFLICT, 'habit not deleted'));
    } else {
      const deletedHabit = await Habit.findByIdAndDelete(habitId);

      res.status(httpStatusCodes.ACCEPTED);
      res.json(deletedHabit);
    }
  } catch (error) {
    next(error);
  }
};

export default habitDelete;
