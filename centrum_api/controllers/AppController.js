class AppController {
  static get(req, res) {
    return res.send('Hola, como estas');
  }

  static bebe(req, res) {
    return res.send("Hola como estas uste, Quiera");
  }
}


module.exports = AppController;
