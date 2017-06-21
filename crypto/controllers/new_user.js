module.exports = (app,db)=>{
  const bodyParser = require('body-parser');
  const urlencoded = bodyParser.urlencoded({extended : false});
  const json = bodyParser.json();
  app.use(bodyParser.json());

  let ref = db.ref('/user_base');
  let uref = ref.child('users');

  app.post('/users',(req,res)=>{
    let hash_gen = generate_hash(req.body);
    let data = req.body;
    let new_user = {
      uname : data.usr_name,
      fullName : data.full_name,
      contacts : [],
      social : '',
      uid : hash_gen
    }

    // setting a new user.
    uref.set(new_user);

  })

}

function generate_hash(jbody){
  let str = jbody.stringify();
  console.log(str);
  //perform hashing
}
