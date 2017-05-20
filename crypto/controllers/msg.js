module.exports = (app,admin)=>{
  var bodyParser = require('body-parser');
  var urlencoded = bodyParser.urlencoded({extended : false});
  var json = bodyParser.json();
  app.use(bodyParser.json());

// write a separate method to get the user and add to the specific user's data


  // Control for message sending to the server.
  app.post('/index',(req,res)=>{
    console.log('request recieved');
    console.log(req.body);
    var data = req.body;
    var user = data.user;
    var target = data.target;
    var db = admin.database();
    var user_ref_addr = '/user_base/' + user;
    var target_ref_addr = '/user_base/' + target;
    var user_ref = db.ref(user_ref_addr);
    var target_ref = db.ref(target_ref_addr);

    // ref.set({
    //   name : 'Anubhav',
    //   usr_name : 'AbT10',
    //   mail : 'atworkstudios@gmail.com',
    //   contacts : [{
    //     usr_name : 'pt',
    //     full_name : 'Piyush',
    //     messages : [{
    //       txt : 'Hello',
    //       time : '08-05-2017 14:20:00'
    //     }]
    //   }]
    // });

    var msg_ref = db.ref('/user_base/AbT/contacts/0/messages');
    msg_ref.push({
      txt : 'heloawed o',
      time : '08-05-2017 14:23:00'
    });
    // var contact_ref = ref.child('/contacts/'+data.sender);
    // contact_ref.
    //Send to the database
  })
}
