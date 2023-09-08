import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true, max: 100 },
  email: { type: String, required: true, max: 100 },
  password: { type: String, required: true, max: 100 },
  profile: {
    educationLevel: { type: String, required: true },
    occupation: { type: String, required: true },
    smoker: { type: String, required: true },
    drinker: { type: String, required: true },
    diet: { type: String, required: true },
    budget: { type: Object, required: true },
    pet: { type: Boolean, required: true },
    hobbies: { type: [{ type: String }], required: true },
    gender: { type: String, required: true }
  },
  preference: {
    ageRange: {
      min: { type: Number, required: true, max: 100, min: 18 }, // 18
      max: { type: Number, required: true, max: 100 },
      weight: { type: Number, required: true, max: 5 }
    },
    gender: {
      value: { type: [String], required: true },
      weight: { type: Number, required: true, max: 5 }
    },
    occupation: {
      value: { type: String, required: true },
      weight: { type: Number, required: true, max: 5 }
    },
    educationLevel: {
      value: { type: String, required: true },
      weight: { type: Number, required: true, max: 5 }
    },
    smoker: {
      value: { type: Boolean, required: true },
      weight: { type: Number, required: true, max: 5 }
    },
    drinker: {
      value: { type: Boolean, required: true },
      weight: { type: Number, required: true, max: 5 }
    },
    diet: {
      value: { type: String, required: true },
      weight: { type: Number, required: true, max: 5 }
    },
    budget: {
      value: { type: Object, required: true },
      weight: { type: Number, required: true, max: 5 }
    },
    pet: {
      value: { type: String, required: true },
      weight: { type: Number, required: true, max: 5 }
    },
    hobbies: {
      value: { type: [String], required: true }
    }
  },
  profilePictureURL: { type: String, required: true },
  percentageProfileCompletion: { type: Number, required: true, max: 100 },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true }

});

export default mongoose.model('user', UserSchema);
