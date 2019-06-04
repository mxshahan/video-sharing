import mongoose from 'mongoose';
// import uniqueValidator from 'mongoose-unique-validator';
import timestamp from 'mongoose-timestamp';
import { Crud } from '@utl';

const filesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CategoryModel',
    required: true
  },
  description: {
    type: String
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'userModel'
  },
  parmalink: {
    type: String,
    required: true
  },
    tag : [{
      type : String
    }],
  price : {
    type : String,
    default : '0'
  },
  like: [{
    type : mongoose.Schema.Types.ObjectId,
    ref : 'userModel'
  }],
  comments : [{
    type : mongoose.Schema.Types.ObjectId,
    ref : 'commentModel'
  }],
  thumbnail: {
    type: String
  }
});

// filesSchema.plugin(uniqueValidator);
filesSchema.plugin(timestamp);

const filesModel = mongoose.model('filesModel', filesSchema);
const filesCrud = new Crud(filesModel);

export {
  filesCrud,
  filesModel
};
