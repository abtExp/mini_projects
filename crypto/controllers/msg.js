module.exports = (app,db)=>{
    app.post('/index/:user',(req,res)=>{
        let target = req.query.target,
        tid = req.query.tid,
        sender = req.params.user;

        //make database connection to the tid and set the message in the sender field.
    })
}