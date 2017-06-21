module.exports = (app,db)=>{
  const bodyParser = require('body-parser'),
  urlencoded = bodyParser.urlencoded({extended : false}),
  json = bodyParser.json();
  app.use(bodyParser.json());

// write a separate method to get the user and add to the specific user's data


  // Control for message sending to the server.
  app.post('/index',(req,res)=>{
    console.log('request recieved');
    console.log(req.body);
    let data = req.body,
    user = data.user,
    target = data.target,
    user_ref_addr = '/user_base/users/' + user,
    target_ref_addr = '/user_base/users/' + target,
    user_ref = db.ref(user_ref_addr),
    target_ref = db.ref(target_ref_addr);

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

    let msg_ref = db.ref(`/user_base/users/${user}/contacts/${target}/messages`);
    msg_ref.push({
    });
    // var contact_ref = ref.child('/contacts/'+data.sender);
    // contact_ref.
    //Send to the database
  })
}
