module.exports = app=>{

  //Control site navigation

  //home page

  app.get('/home/:user',(req,res)=>{
    console.log('Visiting the home page of ' + req.params.user);
    res.send('index/' + req.params.user);
  });

  app.get('/',(req,res)=>{
    res.render('/main');
  })
}
