import { Document, Schema } from "mongoose";
import * as mongoose from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}
const UserSchema: Schema = new Schema({
  name: { type: String, required: true, minLength: 1, maxLength: 255 },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

// Hash the password
UserSchema.pre("save", function (next) {
  const user = this;
  // if user password is not modified
  if (!user.isModified("password")) {
    return next();
  }
  // salt and hash password
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password as string, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function (candidatePassword: string) {
  const user = this;
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
      if (err) {
        return reject(err);
      }
      if (!isMatch) {
        return reject(false);
      }
      resolve(true);
    });
  });
};
export const User = mongoose.model<IUser>("Users", UserSchema);
