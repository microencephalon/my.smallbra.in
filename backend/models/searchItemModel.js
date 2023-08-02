// backend/models/searchItemModel.js
const mongoose = require('mongoose');

const searchItemSchema = new mongoose.Schema(
  {
    dateCreated: {
      type: Date,
      default: Date.now,
    },
    dateModified: {
      type: Date,
      default: Date.now,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: 'User',
    },
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      refPath: 'onModel',
      required: false,
    },
    description: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: false,
    },
    slug: {
      type: String,
      required: true,
    },
    visible: {
      type: Boolean,
      required: true,
    },
    onModel: {
      type: String,
      required: true,
      enum: ['Post', 'Artifact'],
    },
    itemType: {
      type: String,
      required: true,
      enum: ['blog', 'portfolio'],
      default: function () {
        switch (this.onModel) {
          case 'Post':
            return 'blog';
          case 'Artifact':
            return 'portfolio';
          default:
            return;
        }
      },
    },
    refId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: 'onModel',
    },
  },
  { timestamps: true }
);

searchItemSchema.index(
  {
    itemType: 'text',
    title: 'text',
    author: 'text',
    category: 'text',
    description: 'text',
    summary: 'text',
  },
  { name: 'GeneralIndex' }
);

module.exports = mongoose.model('SearchItem', searchItemSchema);
