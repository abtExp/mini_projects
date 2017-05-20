module.exports = (app,admin)=>{
  var bodyParser = require('body-parser');
  var urlencoded = bodyParser.urlencoded({extended : false});
  var json = bodyParser.json();
  app.use(bodyParser.json());

  var db = admin.database();
  var ref = db.ref('/user_base');

  app.post('/users',(req,res)=>{
    var data = req.body;
    var new_user = {
      uname : data.usr_name,
      fullName : data.full_name,
      contacts : [],
      social : ''
    }

    // setting a new user.
    ref.set(new_user);

  })
}
