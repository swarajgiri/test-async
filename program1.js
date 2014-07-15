var fs = require('fs');


var files = ['f1', 'f2', 'f3'];

function readFileForIndex(i) {
    if (i < files.length) {
        fs.readFile(files[i]+'.txt', {'encoding' : 'utf-8'}, function(err, data) {

            if(err) {
                throw(err);
            }

            console.log(data);

            readFileForIndex(i+1);
        });
    } else  {
        console.log('done');
    }
}

readFileForIndex(0);



