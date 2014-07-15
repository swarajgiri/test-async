var async = require('./async');
var fs = require('fs');

/*async.each(
    ['f1', 'f2', 'f3'],
    function (file, whenDone) {
        fs.readFile(file+'.txt', {'encoding' : 'utf-8'}, function(err, data) {

            if(err) {
                return whenDone(err);
            }

            console.log(data);
            whenDone();
        });
    },
    function(err) {

        if (err) {
            throw err;
        }

        console.log('done');
    }
);

async.eachSeries(
    ['f1', 'f2', 'f3'],
    function (file, whenDone) {
        fs.readFile(file+'.txt', {'encoding' : 'utf-8'}, function(err, data) {

            if(err) {
                return whenDone(err);
            }

            console.log(data);
            whenDone();
        });
    },
    function(err) {

        if (err) {
            throw err;
        }

        console.log('done');
    }
);

async.eachLimit(
    ['f2', 'f3', 'f1'],
    2,
    function (file, whenDone) {
        fs.readFile(file+'.txt', {'encoding' : 'utf-8'}, function(err, data) {

            if(err) {
                return whenDone(err);
            }

            console.log(data);
            whenDone();
        });
    },
    function(err) {

        if (err) {
            throw err;
        }

        console.log('done');
    }
);


async.map(
    [2, 4, 6],
    function (item, whenDone) {
        whenDone(null, item*2);
    },
    function(err, results) {

        if (err) {
            throw err;
        }

        console.log(results);
    }
);
async.mapSeries(
    [2, 4, 6],
    function (item, whenDone) {
        whenDone(null, item*2);
    },
    function(err, results) {

        if (err) {
            throw err;
        }

        console.log(results);
    }
);
*/
async.mapLimit(
    [2, 4, 6],
    2,
    function (item, whenDone) {
        whenDone(null, item*2);
    },
    function(err, results) {

        if (err) {
            throw err;
        }

        console.log(results);
    }
);
