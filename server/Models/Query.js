const mongoose = require('mongoose')

const QuerySchema = new mongoose.Schema({
    Question: {
      type: String,
      required: true,
    },
    Category: {
      type: String,
      required: true,
    },
    CreatedBy: {
      type: String,
      required: true,
    },
    approved: {
      type: Boolean,
    },
    like: {
      type: Number,
      default: 0,
    },
    remarks: [
      {
        text: {
          type: String,
          required: true,
        },
        createdBy: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    likedby:
      [{
        username: {
          type: String,
          required: true,
        }
      }
  
      ]
  
  });

  module.exports  = mongoose.model('Query',QuerySchema)
