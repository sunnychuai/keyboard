define(function (require) {
    var $ = require('jquery');
    require('KeyBoard');

    var start = function () {
       var text = new KeyBoard();
    };

    return {
        start: start
    }
});