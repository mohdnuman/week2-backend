const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const roleSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  grade: {
    type: String,
  },
  course: {
    type: String,
  },
});

const studentPrivateField = ["grade", "course"];

// roleSchema.pre("save", async function (next) {
//   const user = this;
//   if (!user.isModified("password")) return next();

//   // Random additional data
//   const saltWorkFactor = process.env.SALTWORKFACTOR || 10;
//   const salt = await bcrypt.genSalt(saltWorkFactor);

//   const hash = await bcrypt.hashSync(user.password, salt);

//   // Replace the password with the hash
//   user.password = hash;

//   return next();
// });

const Role = mongoose.model("role", roleSchema);

// module.exports = { Role, studentPrivateField };
module.exports= Role;