const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const departementSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  postes: [{
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }]
});

module.exports = mongoose.model('Departement', departementSchema);