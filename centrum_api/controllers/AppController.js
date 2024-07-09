const fs = require('fs');

class AppController {
  static get(req, res) {
    return res.send('Hola, como estas');
  }

  static bebe(req, res) {
    return res.send("Hola como estas uste, Quiera");
  }
	
  static read_file(req, res) {
    fs.readFile('my.txt', function(err, data){
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      return res.end()

    })
  }
}


module.exports = AppController;
