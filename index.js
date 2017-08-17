const zlib = require('zlib'),
    fs = require('fs'),
    tar = require('tar'),
    util = require('util'),
    readFile = util.promisify(fs.readFile),
    unzip = util.promisify(zlib.gunzip);


tar.x({
        file: './notMNIST_small.tar.gz'
    })
    .then(_ => {
        console.log('TARRED');
    })
    .catch(err => {
        console.error(err);
    })
let train_set;

tar.t({
    file: './notMNIST_small.tar.gz',
    onentry: ent => {
        train_set = ent;
    }
})

readFile('./notMNIST_small.tar.gz')
    .then(file => {
        unzip(file)
            .then(dat => {
                train_set = dat;
            })
            .catch(err => {
                console.error(err);
            })

    })
    .catch(err => {
        console.error(err);
    })


console.log(typeof train_set);