import { Schema, model } from 'mongoose';

import { handleMongooseError, setUpdateOptions } from '../hooks.js';

import { emailRegexp } from '../../constants/index.js';

const userSchema = new Schema({
  username: {
    type: String,
    minLength: 3,
  },
  email: {
    type: String,
    match: emailRegexp,
    unique: true,
    required: [true, "Email must be exist"],
  },
  password: {
    type: String,
    required: true,
  }
}, {versionKey: false, timestamps: true});

userSchema.pre("save", function() {
  if(!this.username) {
    this.username = this.email;
  }
})

userSchema.post("save", handleMongooseError);

userSchema.pre("findOneAndUpdate", setUpdateOptions);

userSchema.post("findOneAndUpdate", handleMongooseError);

userSchema.methods.toJSON = function(){
  const obj = this.toObject();
  delete obj.password;
  return obj;
}

const User = model("user", userSchema);

export default User;
