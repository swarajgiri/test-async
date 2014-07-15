function eachModule(arr, userCallback) {
    this.loopClosed   = false;
    this.countdown    = arr.length;
    this.userCallback = userCallback;
}
eachModule.prototype = {
    errCallback: function (err) {
        if (!this.loopClosed) {
            if (typeof err !== 'undefined' && err) {
                this.loopClosed = true;
                return this.userCallback(err);
            }

            this.countdown--;
            if (!this.countdown) {
                this.userCallback(null);
            }
        }
    }
};

function each(arr, iterator, callback) {
    var emod = new eachModule(arr, callback);

    arr.forEach(function (x) {
        iterator(x, emod.errCallback.bind(emod));
    });
}

function eachSeries(arr, iterator, callback) {
    var currentIndex = 0;
    iterator(arr[currentIndex], whenDone);

    function whenDone (err) {
        if (typeof err !== 'undefined' && err) {
            return callback(err);
        }

        currentIndex++;

        if (currentIndex < arr.length) {
            iterator(arr[currentIndex], whenDone);
        } else {
            callback(null);
        }
    }
}

function eachLimit(arr, limit, iterator, callback) {
    var startingBatch    = arr.slice(0, limit);
    var remainingBatch   = arr.slice(limit);
    var countdown        = arr.length;
    var loopClosed       = false;
    var currentlyRunning = Math.min(arr.length, limit);

    startingBatch.forEach(function (x) {
        iterator(x, whenDone);
    });

    function whenDone(err) {
        if (loopClosed) {
            return;
        }

        if (typeof err !== 'undefined' && err) {
            loopClosed = true;
            return callback(err);
        }

        currentlyRunning--;
        countdown--;

        if (currentlyRunning < limit) {
            var nextItem = remainingBatch.shift();

            if (nextItem) {
                currentlyRunning++;
                return iterator(nextItem, whenDone);
            }
        }

        if (!countdown) {
            callback(null);
        }
    }
}

function map(arr, iterator, callback) {
    var results = [];
    var loopClosed = false;
    var countdown = arr.length;

    function whenDone(err, transformed) {
        if (!loopClosed) {
            if (typeof err !== 'undefined' && err) {
                loopClosed = true;
                return callback(err, results)
            }

            console.log('called for ' + this.index);

            results[this.index] = transformed;

            countdown--;

            if (!countdown) {
                callback(null, results);
            }
        }
    }

    for (var i = 0; i < arr.length; i++) {
        iterator(arr[i], whenDone.bind({index: i}));
    };
}

function mapSeries(arr, iterator, callback) {
    var results = [];

    iterator(arr[0], whenDone.bind({index: 0}));

    function whenDone(err, transformed) {
        if (typeof err !== 'undefined' && err) {
            return callback(err, results)
        }
        console.log('called for ' + this.index);

        if (this.index < arr.length) {
            results[this.index] = transformed;
            return iterator(arr[this.index + 1], whenDone.bind({index: this.index + 1}));
        }

        callback(null, results);
    }
}

function mapLimit(arr, limit, iterator, callback) {
    var results = [];
    var startingBatch = arr.slice(0, limit);
    var remainingBatch = arr.slice(limit);
    var countdown = arr.length;
    var loopClosed = false;
    var currentlyRunning = Math.min(arr.length, limit);

    for (var i = 0; i < startingBatch.length; i++) {
        iterator(startingBatch[i], whenDone.bind({index: i}));
    };

    function whenDone (err, transformed) {
        if (loopClosed) {
            return;
        }

        if (typeof err !== 'undefined' && err) {
            loopClosed = true;
            return callback(err);
        }

        results[this.index] = transformed;

        currentlyRunning--;
        countdown--;

        if (currentlyRunning < limit) {
            var nextItem = remainingBatch.shift();

            if (nextItem) {
                currentlyRunning++;

                return iterator(nextItem, whenDone.bind({index: arr.indexOf(nextItem)}));
            }
        }

        if (!countdown) {
            callback(null, results);
        }

    }
}

module.exports = {
    'each': each,
    'eachSeries' : eachSeries,
    'eachLimit' : eachLimit,
    'map' : map,
    'mapSeries' : mapSeries,
    'mapLimit' : mapLimit,
};
