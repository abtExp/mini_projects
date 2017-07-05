module.exports = (app,db)=>{
    app.post('/user_base/:user',(req,res)=>{
        console.log(`Request Made for ${req.params.user}`);
        console.log(`credentials = ${req.body.cred}`);
        res.end('Success',{
            status : 200
        });
    })

}