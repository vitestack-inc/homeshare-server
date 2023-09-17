import mongoose, { type Document } from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';

interface IUser extends Document {
  name: string
  email: string
  password: string
  confirmPassword?: string
  age: number
  profile: {
    educationLevel: string
    occupation: string
    smoker: string
    drinker: string
    diet: string
    budget: object
    pet: boolean
    hobbies: string[]
    gender: string
  }
  preference: {
    educationLevel: string
  }
  profilePictureURL: string
  percentageProfileCompletion: number
  createdAt: Date
  updatedAt: Date
}

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, max: 100 },
  age: { type: Number, required: true, min: 18, max: 100 },

  email: {
    type: String,
    required: [true, 'Please provide your email'],
    max: 100,
    unique: true,
    lowercase: true,
    validate: {
      validator: function (value: string) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        return validator.isEmail(value);
      },
      message: 'Please provide a valid email'
    }

    // validate: [(): boolean => validator.isEmail(),
    //   'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please provide your password'],
    max: 100,
    validate: {
      validator: function (value: string) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        return validator.isStrongPassword(value, {
          minLength: 10,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1
        });
      },
      message: 'Password is not strong enough'
    }
  },
  confirmPassword: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function (this: IUser, value: string): boolean {
        return value === this.password;
      },
      message: 'Password and confirm password should be the same'
    }
  },
  profile: {
    educationLevel: { type: String },
    occupation: { type: String },
    smoker: { type: String },
    drinker: { type: String },
    diet: { type: String },
    budget: { type: Object },
    pet: { type: Boolean },
    hobbies: { type: [{ type: String }] },
    gender: { type: String }
  },
  preference: {
    ageRange: {
      min: { type: Number, max: 100, min: 18 }, // 18
      max: { type: Number, max: 100 },
      weight: { type: Number, max: 5 }
    },
    gender: {
      value: { type: [String] },
      weight: { type: Number, max: 5 }
    },
    occupation: {
      value: { type: String },
      weight: { type: Number, max: 5 }
    },
    educationLevel: {
      value: { type: String },
      weight: { type: Number, max: 5 }
    },
    smoker: {
      value: { type: Boolean },
      weight: { type: Number, max: 5 }
    },
    drinker: {
      value: { type: Boolean },
      weight: { type: Number, max: 5 }
    },
    diet: {
      value: { type: String },
      weight: { type: Number, max: 5 }
    },
    budget: {
      value: { type: Object },
      weight: { type: Number, max: 5 }
    },
    pet: {
      value: { type: String },
      weight: { type: Number, max: 5 }
    },
    hobbies: {
      value: { type: [String] }
    }
  },
  profilePictureURL: { type: String },
  percentageProfileCompletion: { type: Number, max: 100 },
  createdAt: { type: Date },
  updatedAt: { type: Date }

});

UserSchema.pre<IUser>('save', async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) {
    next();
    return;
  }

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Delete passwordConfirm field
  this.confirmPassword = undefined;
  next();
});

export default mongoose.model('user', UserSchema);
