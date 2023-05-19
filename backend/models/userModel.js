// backend/models/userModel.js
const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
    isAdmin: {
      type: Boolean,
      required: true,
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
    gender: {
      type: String,
      required: false,
      default: 'Rather not say',
    },
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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);
