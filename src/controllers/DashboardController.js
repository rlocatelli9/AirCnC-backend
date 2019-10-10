const Spot = require('../models/Spot')

module.exports = {
  async show(request, response) {
    const { user_id } = request.headers;
    //encontrar os spots do usário logado
    const spots = await Spot.find({ user: user_id })

    return response.json(spots)
  }
}