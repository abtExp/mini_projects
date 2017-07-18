module.exports = (app,db)=>{
    const urlencoded = require('body-parser').urlencoded;
    app.post('/user_base/:user',urlencoded({extended : false}),(req,res)=>{
        console.log(`Request Made for ${req.params.user}`);
        console.log(`credentials = ${req.body.name}`);
        res.writeHead(200,{
            headers :{
                'redirect':`/home/${req.body.name}`
            }
        });
    })

}