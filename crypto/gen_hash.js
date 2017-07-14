const crypto = require('crypto'),
fs = require('fs'),

files = ['./app.js',
         './controllers/msg.js',
         './controllers/nav.js',
         './controllers/sw_controller.js',
         './controllers/user.js',
         './views/home.ejs',
         './views/index.ejs',
         './views/main.ejs',
         './public/resources/scripts/script.js',
         './public/resources/scripts/lscript.js'
         ];

let hashes = [];

(_=>{
    let ha = [];
    files.map(f=>{
        let hash = crypto.createHash('sha1');
        let stream = fs.ReadStream(f);
        stream.on('data',data=>{
            hash.update(data);
        });

        stream.on('end',_=>{
            let h = hash.digest('hex');
            // console.log(h);
            hashes.push(h);
        })

   })
   console.log(hashes);
})();
