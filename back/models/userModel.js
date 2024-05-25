const mongoose = require("mongoose");
const crypto = require("crypto");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    trim: true,
    required: [true, "Veuillez saisir votre nom"],
  },
  last_name: {
    type: String,
    trim: true,
    required: [true, "Veuillez saisir votre prenom"],
  },
  adresse: {
    type: String,
    trim: true,
    required: [true, "Veuillez saisir votre adresse"],
  },
  email: {
    type: String,
    required: [true, "Veuillez saisir votre email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Mettez un mail correcte"],
  },

  sexe: {
    type: String,
    required: [true, "Veuillez saisir votre sexe"],
    enum:["homme","femme"]
  },
  telephone: {
    type: String,
    
  },
  date_naissance:{
    type: Date,
  },

  role: {
    type: String,
    enum: ["personnel", "admin"],
    default: "personnel",
  },
  poste: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Poste',
    required: true
  },
  password: {
    type: String,
    required: [true, "please provide password"],
    minlength: 4,
    select: false,
  }, 
  passwordChangeAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

userSchema.pre("save", async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified("password")) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);


});

userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.pre(/^find/, function (next) {
  // This points to the current query
  this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  const myPass = await bcrypt.compare(candidatePassword, userPassword);
  return myPass;
};
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangeAt) {
    // YOUR RETURN VALUE
    const changedTimestamp = parseInt(
      this.passwordChangeAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }

  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  console.log({ resetToken }, this.passwordResetToken);
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
