module.exports = (app)=>{
    app.get('/',(req,res)=>{
        //redirect to the main page
        res.render('main');
    }),

    app.get('/home/:user',(req,res)=>{
        //redirect to specified user's home page
        res.render('home',{ name : req.params.user });
    })

    app.get('/index',(req,res)=>{
        //something else
    })
}