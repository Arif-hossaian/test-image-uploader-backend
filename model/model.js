import mongoose from 'mongoose';

const studentSchema = mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    profile: {
      type: String,
      default: 'default.png',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Student', studentSchema);
