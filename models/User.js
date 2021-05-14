import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema(
  {
    nickname: {
      required: true,
      unique: true,
      type: String
    },
    email: {
      required: true,
      unique: true,
      type: String
    },
    password: {
      required: true,
      type: String
    },
    balance: {
      type: Number,
      default: 0
    }
  },
  { versionKey: false }
);

UserSchema.pre('save', async function (next) {
  try {
    const user = this;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt, null);

    user.password = hash;

    next();
  } catch (error) {
    throw error;
  }
});

UserSchema.methods.comparePasswords = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw error;
  }
};

export default mongoose.model('user', UserSchema);
