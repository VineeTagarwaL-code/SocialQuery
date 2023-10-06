const mongoose = require('mongoose')
const remarkSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  createdBy: {
    type: String,
    required: true,
  },
});
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

  likedby:
    [{
      username: {
        type: String,
       
      }
    }

    ],
  remarks: [remarkSchema], // Define an array of remarks using the remarkSchema
  remarkCounter: {
    type: Number,
    default: 0,
  },

});


QuerySchema.methods.addRemark = async function (text, createdBy) {
  try {
    const remark = { text, createdBy };
    this.remarks.push(remark);
    this.remarkCounter += 1;
    await this.save();
  } catch (error) {
    throw error;
  }
};



module.exports = mongoose.model('Query', QuerySchema)
