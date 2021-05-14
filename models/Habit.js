import mongoose from 'mongoose';

const HabitSchema = new mongoose.Schema(
  {
    title: {
      required: true,
      type: String
    },
    description: {
      type: String
    },
    award: {
      type: Number
    },
    price: {
      type: Number
    },
    is_helpful: {
      type: Boolean,
      require: true,
      default: true
    },
    image_url: {
      type: String
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  { versionKey: false }
);

export default mongoose.model('habit', HabitSchema);
