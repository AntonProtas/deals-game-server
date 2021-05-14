import httpStatusCodes from 'http-status-codes';

//models
import Habit from '../../models/Habit.js';

const habitsGet = async (req, res, next) => {
  try {
    const { id: userId } = req.user;

    const habits = await Habit.find({ user_id: userId }).select('-user_id');

    res.status(httpStatusCodes.OK);
    res.json({ habits: habits || [] });
  } catch (error) {
    next(error);
  }
};

export default habitsGet;
