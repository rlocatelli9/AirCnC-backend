const mongoose = require('mongoose')

const SpotSchema = new mongoose.Schema({
  thumbnail: String,
  company: String,
  price: Number,
  techs: [String],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  toJSON: {
    virtuals: true,
  },
});

SpotSchema.virtual('thumbnail_url').get(function () {
  return `http://10.0.0.107:1234/files/${this.thumbnail}`
})

//criando o model
module.exports = mongoose.model('Spot', SpotSchema)
