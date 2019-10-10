//tudo que for relacionado a Seção será colocado aqui
/*métodos dentro do Controller: 
  index = return list session
  show = list a unic session
  store = creat one session
  update = update one session
  destroy = remove/delete one session
*/

const User = require('../models/User')

module.exports = {
  async store(request, response) {
    const { email } = request.body;
    //return response.json(request.body.email)

    let user = await User.findOne({ email })
    if (!user) {
      user = await User.create({ email })
    }
    //await deixa ir para a próxima linha dps de create = true

    return response.json(user)
  }
}