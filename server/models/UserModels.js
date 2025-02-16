import mongoose from "mongoose";
import { genSalt, hash } from "bcrypt";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required."],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required."],
    minLength: 8,
  },
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    //default: "default.jpg",
    required: false,
  },
  color: {
    type: Number,
    required: false,
  },
  profileSetup: {
    type: Boolean,
    default: false,
  },
  /*
    friends:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
*/
});

userSchema.pre("save", async function (next) {
  const salt = await genSalt(); // this can be according t0 the strongness and security of the password
  this.password = await hash(this.password, salt);
  next(); //once this part is done then to call the further code we use next()
  console.log("password has been hashed");
});

const User = mongoose.model("User", userSchema);

export default User;
