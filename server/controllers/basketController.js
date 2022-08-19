const {BasketDevice, Device} = require('../models/models');

class basketController {
  async getBasket(req, res) {
    let {userId} = req.query

    const basketDevice = await BasketDevice.findAll({
      where: {basketId: userId}
    })


    return res.json(basketDevice)
  }

  async createItem(req, res) {
    let {amount, userId, deviceId} = req.body

    const basketDevice = await BasketDevice.create({amount, basketId: userId, deviceId})
    return res.json(basketDevice)
  }

  async deleteItem(req, res) {
    let {userId, deviceId} = req.query

    const basketDevice = await BasketDevice.destroy({
      where: {basketId: userId, deviceId}
    })

    res.status(204)
    return res.send({message: 'successfully deleted'})
  }

}

module.exports = new basketController()