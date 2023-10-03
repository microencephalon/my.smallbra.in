// backend/models/userModel.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
      default: '',
    },
    email: {
      type: String,
      required: false,
      default: '',
      unique: true,
    },
    password: {
      type: String,
      required: function () {
        return !this.githubId;
      },
    },
    isAdmin: {
      type: Boolean,
      required: false,
      default: false,
    },
    phone: {
      type: String,
      required: false,
      default: '',
    },
    birthday: {
      type: Date,
      required: false,
      default: null,
    },
    githubId: {
      type: String,
      required: false,
    },
    profilePicture: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

// Add a pre save middleware to hash the password before saving a new user and a method to compare a provided password with the hashed password in the database.

userSchema.pre('save', async function (next) {
  if (!this.isModified('password') || !this.password) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPasswords = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);

/* 
    homeAddress: {
      type: Object,
      required: false,
      default: {
        street: '',
        unitAndNumber: '',
        buildingNumber: '',
        city: '',
        state: '',
        prefecture: '',
        province: '',
        district: '',
        postalCode: '',
        country: '',
      },
    },
    workAddress: {
      type: Object,
      required: false,
      default: {
        street: '',
        unitAndNumber: '',
        buildingNumber: '',
        city: '',
        state: '',
        prefecture: '',
        province: '',
        district: '',
        postalCode: '',
        country: '',
      },
    },
*/
